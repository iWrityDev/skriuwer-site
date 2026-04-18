"""
fetch_ratings.py — Playwright-based Amazon star-rating + review-count scraper.

Targets only own books (isOwnBook=True) that have no rating yet.
Visits amazon.com (English) so selectors and text are consistent.

Usage:
    python scripts/fetch_ratings.py              # dry run: print what it found
    python scripts/fetch_ratings.py --save       # write results to books.json
    python scripts/fetch_ratings.py --fresh      # ignore cached results, re-scrape
    python scripts/fetch_ratings.py --all        # also update third-party books with no rating
    python scripts/fetch_ratings.py --delay 3    # slower (default 2.5s base)

Progress is cached in scripts/ratings_cache.json so you can resume after interruption.
"""

import json
import re
import sys
import argparse
import random
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("playwright not installed — run:")
    print("  pip install playwright")
    print("  playwright install chromium")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
BOOKS_JSON  = SCRIPT_DIR.parent / "data" / "books.json"
CACHE_FILE  = SCRIPT_DIR / "ratings_cache.json"


# ── Selectors ────────────────────────────────────────────────────────────────
# Amazon uses multiple layouts; we try each in priority order.

RATING_SELECTORS = [
    # Most reliable: the popover trigger tooltip
    "span[data-hook='rating-out-of-text']",
    # Average star rating widget
    "i[data-hook='average-star-rating'] span.a-icon-alt",
    # Fallback: generic icon-alt near the review count
    "#acrPopover span.a-icon-alt",
    # Kindle-specific page layout
    ".reviewCountTextLinkedHistogram span.a-icon-alt",
]

REVIEW_COUNT_SELECTORS = [
    "span[data-hook='total-review-count']",
    "#acrCustomerReviewText",
    "a[data-hook='see-all-reviews-link-foot']",   # sometimes has count in text
]


def parse_rating(text: str) -> float | None:
    """Extract numeric rating from '4.5 out of 5 stars' style strings."""
    text = text.strip().lower()
    m = re.search(r"(\d+(?:[.,]\d+)?)\s+(?:out of|von|de)", text)
    if m:
        return round(float(m.group(1).replace(",", ".")), 1)
    # bare number fallback
    m = re.search(r"^(\d+(?:[.,]\d+)?)", text)
    if m:
        val = float(m.group(1).replace(",", "."))
        if 1.0 <= val <= 5.0:
            return round(val, 1)
    return None


def parse_review_count(text: str) -> int | None:
    """Extract integer from '1,234 ratings' / '1.234 Sternebewertungen' etc."""
    # Remove thousands separators and extract first run of digits
    digits = re.sub(r"[,.\s]", "", text.strip())
    m = re.search(r"(\d+)", digits)
    if m:
        return int(m.group(1))
    return None


def scrape_rating(page, asin: str) -> tuple[float | None, int | None]:
    """
    Visit amazon.com/dp/{asin} and return (star_rating, review_count).
    Returns (None, None) on failure or CAPTCHA.
    """
    url = f"https://www.amazon.com/dp/{asin}"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2000)

        # CAPTCHA check — wait up to 90s for user to solve
        for _ in range(90):
            title = page.title().lower()
            if any(kw in title for kw in ("robot", "captcha", "characters", "enter the characters")):
                print("  ⚠ CAPTCHA — solve in the browser window (waiting up to 90s)...", flush=True)
                page.wait_for_timeout(1000)
            else:
                break

        star_rating: float | None = None
        review_count: int | None = None

        # --- Star rating ---
        for sel in RATING_SELECTORS:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    text = el.inner_text().strip()
                    parsed = parse_rating(text)
                    if parsed is not None:
                        star_rating = parsed
                        break
            except Exception:
                pass

        # --- Review count ---
        for sel in REVIEW_COUNT_SELECTORS:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    text = el.inner_text().strip()
                    parsed = parse_review_count(text)
                    if parsed is not None:
                        review_count = parsed
                        break
            except Exception:
                pass

        return star_rating, review_count

    except Exception as e:
        print(f"  [ERROR] {asin}: {type(e).__name__}: {e}", flush=True)
        return None, None


def load_cache() -> dict:
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Scrape Amazon star ratings for own books")
    parser.add_argument("--save",  action="store_true", help="Write updated ratings to books.json")
    parser.add_argument("--fresh", action="store_true", help="Ignore cache, re-scrape all")
    parser.add_argument("--all",   action="store_true", help="Also process third-party books with no rating")
    parser.add_argument("--delay", type=float, default=2.5, help="Base delay between requests (default: 2.5s)")
    args = parser.parse_args()

    with open(BOOKS_JSON, encoding="utf-8") as f:
        data = json.load(f)
    books = data["books"]

    # Decide which books to process
    if args.all:
        targets = [b for b in books if not b.get("starRating") and b.get("asin")]
    else:
        targets = [
            b for b in books
            if b.get("isOwnBook") and not b.get("starRating") and b.get("asin")
        ]

    print(f"Books to check : {len(targets)}")
    print(f"Save mode      : {'YES — will update books.json' if args.save else 'dry run (--save to write)'}")
    print(f"Cache          : {'fresh (ignoring old)' if args.fresh else 'resuming from cache'}")
    print()

    cache = {} if args.fresh else load_cache()
    already_cached = set(cache.keys())

    updated = 0
    skipped = 0
    no_data  = 0

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=False,
            slow_mo=50,
            args=["--start-maximized"],
        )
        context = browser.new_context(
            viewport={"width": 1400, "height": 900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )
        page = context.new_page()

        for i, book in enumerate(targets):
            asin  = book["asin"]
            title = book.get("title", "")[:65]

            if asin in already_cached:
                skipped += 1
                cached = cache[asin]
                # Apply cached data back to the book object for --save
                if cached.get("starRating") is not None:
                    book["starRating"]  = cached["starRating"]
                    book["reviewCount"] = cached.get("reviewCount", 0)
                continue

            print(f"  [{i+1}/{len(targets)}] {asin}  {title}", flush=True)

            rating, count = scrape_rating(page, asin)

            result = {"starRating": rating, "reviewCount": count}
            cache[asin] = result

            if rating is not None:
                book["starRating"]  = rating
                book["reviewCount"] = count if count is not None else 0
                print(f"    → ★ {rating}  ({count} reviews)", flush=True)
                updated += 1
            else:
                print(f"    → no rating data found", flush=True)
                no_data += 1

            # Save cache every 10 books so we can resume
            if (updated + no_data) % 10 == 0:
                save_cache(cache)

            delay_ms = int((args.delay + random.uniform(0, 1.5)) * 1000)
            page.wait_for_timeout(delay_ms)

        browser.close()

    save_cache(cache)

    # Write to books.json if --save
    if args.save:
        data["books"] = books
        with open(BOOKS_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\nSaved to {BOOKS_JSON}")

    print(f"\n{'='*55}")
    print(f"Targets        : {len(targets)}")
    print(f"Scraped fresh  : {updated + no_data}  (resumed: {skipped})")
    print(f"Got rating     : {updated}")
    print(f"No data found  : {no_data}")
    print(f"{'books.json updated' if args.save else 'Dry run — add --save to write'}")


if __name__ == "__main__":
    main()
