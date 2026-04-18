"""
scrape_bestsellers.py — Scrapes Amazon bestseller pages and updates books.json.

Two modes:
  1. DISCOVER mode: hits Amazon category bestseller pages, finds top books,
     adds them to books.json (if not already present / not deleted).
  2. REFRESH mode: re-visits every existing third-party book's product page
     and updates reviewCount + starRating with live Amazon data.

Usage:
    python scripts/scrape_bestsellers.py --mode discover   # add new bestsellers
    python scripts/scrape_bestsellers.py --mode refresh    # update review counts
    python scripts/scrape_bestsellers.py --mode both       # discover then refresh

Runs with a VISIBLE browser (headed) to avoid Amazon bot detection.
Solve any CAPTCHA that appears — the script waits 60s.
"""

import io
import json
import re
import sys
import time
import argparse
import unicodedata
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

BASE_DIR     = Path(__file__).parent.parent
BOOKS_JSON   = BASE_DIR / "data" / "books.json"
DELETED_JSON = BASE_DIR / "data" / "deleted_slugs.json"

MIN_REVIEWS = 200   # Only add books with at least this many reviews

# ── Category bestseller URLs ──────────────────────────────────────────────────
BESTSELLER_URLS = [
    # (url, [categories])
    ("https://www.amazon.com/Best-Sellers-Books-History/zgbs/books/9",          ["history"]),
    ("https://www.amazon.com/Best-Sellers-Books-Ancient-History/zgbs/books/14974961", ["history"]),
    ("https://www.amazon.com/Best-Sellers-Books-Military-History/zgbs/books/10181",   ["history", "dark-history"]),
    ("https://www.amazon.com/Best-Sellers-Books-World-War-II/zgbs/books/10320",       ["history", "dark-history"]),
    ("https://www.amazon.com/Best-Sellers-Books-Mythology-Folklore/zgbs/books/10356", ["mythology"]),
    ("https://www.amazon.com/Best-Sellers-Books-Religion-Spirituality/zgbs/books/22", ["religion"]),
    ("https://www.amazon.com/Best-Sellers-Books-Science-Math/zgbs/books/75",          ["science"]),
    ("https://www.amazon.com/Best-Sellers-Books-Self-Help/zgbs/books/4736",           ["self-help"]),
    ("https://www.amazon.com/Best-Sellers-Books-Foreign-Language/zgbs/books/1",       ["language-learning"]),
    ("https://www.amazon.com/Best-Sellers-Books-True-Crime/zgbs/books/10672",         ["true-crime"]),
    ("https://www.amazon.com/Best-Sellers-Books-Biographies-Memoirs/zgbs/books/6",    ["biography"]),
    ("https://www.amazon.com/Best-Sellers-Books-Philosophy/zgbs/books/4829",          ["philosophy"]),
    ("https://www.amazon.com/Best-Sellers-Books-Psychology/zgbs/books/25",            ["psychology"]),
    # Search-based for categories without a browse node
    ("https://www.amazon.com/s?k=conspiracy+theory+books&i=stripbooks&s=review-rank", ["conspiracy"]),
    ("https://www.amazon.com/s?k=viking+history+books&i=stripbooks&s=review-rank",    ["history"]),
    ("https://www.amazon.com/s?k=ancient+egypt+books&i=stripbooks&s=review-rank",     ["history"]),
    ("https://www.amazon.com/s?k=norse+mythology+books&i=stripbooks&s=review-rank",   ["mythology"]),
    ("https://www.amazon.com/s?k=greek+mythology+books&i=stripbooks&s=review-rank",   ["mythology"]),
]


def load_json(path, default=None):
    if not path.exists():
        return default if default is not None else {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[''`\"]", "", text)
    text = re.sub(r"[^a-z0-9\s-]", " ", text.lower())
    text = re.sub(r"\s+", "-", text.strip())
    text = re.sub(r"-+", "-", text)
    return text[:80]


def wait_for_captcha(page, context_label=""):
    title = page.title().lower()
    if any(w in title for w in ["captcha", "type the char", "robot", "enter the char"]):
        print(f"\n  ⚠ CAPTCHA on {context_label} — solve it in the browser (60s) ...")
        for _ in range(60):
            page.wait_for_timeout(1000)
            t = page.title().lower()
            if not any(w in t for w in ["captcha", "type the char", "robot", "enter the char"]):
                print("  ✓ CAPTCHA solved")
                break


def scrape_listing_page(page, url, categories):
    """
    Scrape one Amazon listing page (bestseller or search).
    Returns list of {asin, title, categories}.
    """
    results = []
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2000)
        wait_for_captcha(page, url[:50])

        # Bestseller list cards
        cards = page.locator('[data-asin]').all()
        for card in cards:
            try:
                asin = card.get_attribute("data-asin")
                if not asin or len(asin) < 8:
                    continue
                if asin.startswith("B0"):
                    continue  # Skip Kindle
                title_el = card.locator("h2, .s-title-instructions-style, ._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y").first
                title = ""
                if title_el.count() > 0:
                    title = title_el.inner_text().strip()
                if not title:
                    continue
                results.append({"asin": asin, "title": title, "categories": categories})
            except Exception:
                pass

        print(f"  Found {len(results)} books on page")
    except Exception as e:
        print(f"  Error: {e}")
    return results


def fetch_product_details(page, asin):
    """
    Visit a product page and return full details.
    """
    url = f"https://www.amazon.com/dp/{asin}"
    details = {
        "asin": asin,
        "url": url,
        "title": "",
        "author": "",
        "description": "",
        "cover_image": "",
        "review_count": 0,
        "star_rating": None,
        "pages": None,
        "published_date": None,
    }

    try:
        page.goto(url, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(2000)
        wait_for_captcha(page, asin)

        # Title
        for sel in ["#productTitle", "h1#title span"]:
            el = page.locator(sel).first
            if el.count() > 0:
                details["title"] = el.inner_text().strip()
                break

        # Author
        for sel in ["#bylineInfo span.author a", ".author a", "#bylineInfo a"]:
            el = page.locator(sel).first
            if el.count() > 0:
                details["author"] = el.inner_text().strip()
                break

        # Review count
        for sel in ["#acrCustomerReviewText", 'span[data-hook="total-review-count"]']:
            el = page.locator(sel).first
            if el.count() > 0:
                txt = el.inner_text().strip().replace(",", "").replace(".", "")
                nums = re.findall(r"\d+", txt)
                if nums:
                    details["review_count"] = int(nums[0])
                    break

        # Star rating
        for sel in ['span[data-hook="rating-out-of-text"]', 'i[data-hook="average-star-rating"] span.a-icon-alt', "#acrPopover span.a-size-base"]:
            el = page.locator(sel).first
            if el.count() > 0:
                m = re.search(r"([\d,\.]+)", el.inner_text().strip())
                if m:
                    try:
                        details["star_rating"] = float(m.group(1).replace(",", "."))
                        break
                    except ValueError:
                        pass

        # Cover image
        for sel in ["#imgTagWrapperId img", "#ebooksImgBlkFront", "#landingImage"]:
            el = page.locator(sel).first
            if el.count() > 0:
                src = el.get_attribute("src") or el.get_attribute("data-old-hires") or ""
                if src.startswith("http") and "images" in src:
                    # Try to get the high-res version
                    src = re.sub(r"\._[A-Z]{2}\d+_", "._SX500_", src)
                    details["cover_image"] = src
                    break

        # Description
        for sel in ["#bookDescription_feature_div .a-expander-content", "#productDescription p", "#bookDescription_feature_div"]:
            el = page.locator(sel).first
            if el.count() > 0:
                txt = el.inner_text().strip()
                if len(txt) > 80:
                    paras = [p.strip() for p in txt.split("\n\n") if p.strip()]
                    details["description"] = "\n".join(f"<p>{p}</p>" for p in paras[:4])
                    break

        # Pages
        for sel in ['li.rpi-icon-book:has-text("pages")', '.detail-bullet-list li']:
            items = page.locator(sel).all()
            for item in items:
                txt = item.inner_text()
                m = re.search(r"(\d+)\s*pages?", txt, re.I)
                if m:
                    details["pages"] = int(m.group(1))
                    break

        # Published date
        for sel in ['.detail-bullet-list li']:
            items = page.locator(sel).all()
            for item in items:
                txt = item.inner_text()
                if "Publish" in txt or "Date" in txt:
                    m = re.search(r"(\w+ \d{1,2},\s*\d{4})", txt)
                    if m:
                        details["published_date"] = m.group(1)
                        break

    except Exception as e:
        print(f"    Error fetching {asin}: {e}")

    return details


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["discover", "refresh", "both"], default="discover")
    args = parser.parse_args()

    books_data   = load_json(BOOKS_JSON)
    deleted      = set(load_json(DELETED_JSON, default=[]))
    existing_slugs = {b["slug"] for b in books_data["books"]}
    existing_asins = {b["asin"] for b in books_data["books"] if b.get("asin")}

    print(f"\n{'='*55}")
    print(f"Skriuwer Bestseller Scraper — mode: {args.mode}")
    print(f"{'='*55}")
    print(f"Books in catalog : {len(books_data['books'])}")
    print(f"Deleted slugs    : {len(deleted)}")
    print()
    print("Keep the browser window open. Solve any CAPTCHA that appears.")
    print()

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=False,
            slow_mo=60,
            args=["--start-maximized"],
        )
        context = browser.new_context(
            viewport={"width": 1400, "height": 900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
        )
        page = context.new_page()

        # ── DISCOVER ──────────────────────────────────────────────────────────
        if args.mode in ("discover", "both"):
            print("── Phase 1: Discovering bestsellers ──")
            discovered = {}  # asin -> {title, categories}

            for url, cats in BESTSELLER_URLS:
                print(f"\n  {cats[0].upper()}: {url[:65]}")
                results = scrape_listing_page(page, url, cats)
                for r in results:
                    if r["asin"] not in discovered and r["asin"] not in existing_asins:
                        discovered[r["asin"]] = r
                page.wait_for_timeout(1500)

            print(f"\n  New ASINs to check: {len(discovered)}")

            added = 0
            for i, (asin, info) in enumerate(discovered.items()):
                if asin in existing_asins or asin in deleted:
                    continue

                print(f"\n  [{i+1}/{len(discovered)}] {asin} | {info['title'][:45]}")
                details = fetch_product_details(page, asin)

                if details["review_count"] < MIN_REVIEWS:
                    print(f"    Skip: {details['review_count']} reviews < {MIN_REVIEWS}")
                    page.wait_for_timeout(800)
                    continue

                title  = details["title"] or info["title"]
                author = details["author"] or "Unknown Author"
                slug   = slugify(f"{title} {author.split()[-1]}")

                if slug in existing_slugs or slug in deleted:
                    print(f"    Skip: slug '{slug}' exists/deleted")
                    continue

                # Open Library cover (high quality, HTTPS)
                cover_ol  = f"https://covers.openlibrary.org/b/isbn/{asin}-L.jpg"
                cover_amz = details["cover_image"] or f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01._SX500_.jpg"

                book = {
                    "slug": slug,
                    "asin": asin,
                    "title": title,
                    "description": details["description"] or f"<p>{title} by {author}.</p>",
                    "author": author,
                    "coverImage": cover_ol,
                    "coverImageFallback": cover_amz,
                    "categories": info["categories"],
                    "tags": ["In English"],
                    "language": "en",
                    "pages": details["pages"],
                    "price": None,
                    "currency": "USD",
                    "reviewCount": details["review_count"],
                    "starRating": details["star_rating"],
                    "marketplaces": {
                        "amazon.com":   f"https://www.amazon.com/dp/{asin}",
                        "amazon.de":    f"https://www.amazon.de/dp/{asin}",
                        "amazon.co.uk": f"https://www.amazon.co.uk/dp/{asin}",
                        "amazon.nl":    f"https://www.amazon.nl/dp/{asin}",
                        "amazon.fr":    f"https://www.amazon.fr/dp/{asin}",
                    },
                    "isOwnBook": False,
                    "hookText": None,
                    "publishedDate": details["published_date"],
                }

                books_data["books"].append(book)
                existing_slugs.add(slug)
                existing_asins.add(asin)
                added += 1
                print(f"    ✓ Added: {details['review_count']} reviews, {details['star_rating']}★")
                page.wait_for_timeout(1200)

            save_json(BOOKS_JSON, books_data)
            print(f"\n  ✅ Discover complete: {added} books added")

        # ── REFRESH ───────────────────────────────────────────────────────────
        if args.mode in ("refresh", "both"):
            print("\n── Phase 2: Refreshing review counts ──")
            third_party = [b for b in books_data["books"] if not b.get("isOwnBook")]
            print(f"  Third-party books to refresh: {len(third_party)}")

            for i, book in enumerate(third_party):
                asin = book.get("asin")
                if not asin or asin.startswith("B0"):
                    continue
                print(f"  [{i+1}/{len(third_party)}] {asin} | {book['title'][:45]}")
                details = fetch_product_details(page, asin)

                if details["review_count"] > 0:
                    book["reviewCount"] = details["review_count"]
                if details["star_rating"]:
                    book["starRating"] = details["star_rating"]
                if details["cover_image"] and not book.get("coverImageFallback"):
                    book["coverImageFallback"] = details["cover_image"]

                page.wait_for_timeout(1000 if i % 5 != 4 else 3000)

            save_json(BOOKS_JSON, books_data)
            print(f"\n  ✅ Refresh complete")

        browser.close()

    print(f"\n{'='*55}")
    print(f"Final catalog size: {len(books_data['books'])} books")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
