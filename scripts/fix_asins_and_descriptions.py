"""
fix_asins_and_descriptions.py
Two tasks in one Playwright session:
  1. Find correct ASINs for books that share an ASIN with other books
  2. Fetch descriptions for books that have none

Saves results to:
  scripts/asin_fixes.json       — { slug: correct_asin }
  scripts/description_fixes.json — { asin: description_html }

Run without args to do a dry-run (see what would change).
Run with --apply to patch books.json.
"""

import json, re, sys, io, time, argparse
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from playwright.sync_api import sync_playwright

SCRIPT_DIR = Path(__file__).parent
BOOKS_JSON  = SCRIPT_DIR.parent / "data" / "books.json"
ASIN_FIXES_FILE = SCRIPT_DIR / "asin_fixes.json"
DESC_FIXES_FILE = SCRIPT_DIR / "description_fixes.json"

def load_json(f):
    if Path(f).exists():
        return json.load(open(f, encoding="utf-8"))
    return {}

def save_json(f, d):
    with open(f, "w", encoding="utf-8") as fp:
        json.dump(d, fp, indent=2, ensure_ascii=False)


# ── helpers ────────────────────────────────────────────────────────────────────

def wait_past_captcha(page, timeout_s=90):
    for _ in range(timeout_s):
        t = page.title().lower()
        if "robot" in t or "captcha" in t or "characters" in t or "typ de tekens" in t:
            print("  ⚠ CAPTCHA — please solve in the browser window...", flush=True)
            page.wait_for_timeout(1000)
        else:
            break


def search_for_asin(page, title: str) -> tuple[str, str]:
    """
    Search Amazon.nl for `title`, return (asin, found_title) of first product result.
    Returns ('', '') on failure.
    """
    query = title.replace("|", " ").strip()
    url = f"https://www.amazon.nl/s?k={query.replace(' ', '+')}&i=stripbooks"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(1500)
        wait_past_captcha(page)

        # First result link containing /dp/
        links = page.locator("a[href*='/dp/']").all()
        for link in links:
            href = link.get_attribute("href") or ""
            m = re.search(r"/dp/([A-Z0-9]{10})", href)
            if m:
                asin = m.group(1)
                # Get the title text from nearby element
                try:
                    text = link.inner_text().strip()[:80]
                except Exception:
                    text = ""
                return asin, text
    except Exception as e:
        print(f"    search error: {e}", flush=True)
    return "", ""


def fetch_description(page, asin: str) -> str:
    """
    Fetch description from amazon.nl product page.
    Returns HTML string or empty string.
    """
    url = f"https://www.amazon.nl/dp/{asin}"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(1800)
        wait_past_captcha(page)

        # Try multiple description selectors
        selectors = [
            "#bookDescription_feature_div .a-expander-content",
            "#bookDescription_feature_div",
            "#productDescription .content",
            "#productDescription",
            "#dp-container [data-feature-name='bookDescription']",
            "div[data-a-expander-name='book_description_expander']",
        ]
        for sel in selectors:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    html = el.inner_html().strip()
                    # Clean up Amazon-specific cruft
                    html = re.sub(r'<span[^>]*noCss[^>]*>.*?</span>', '', html, flags=re.DOTALL)
                    html = re.sub(r'<a[^>]*a-expander[^>]*>.*?</a>', '', html, flags=re.DOTALL)
                    html = html.strip()
                    if len(html) > 50:
                        return html
            except Exception:
                pass

        # Fallback: meta description
        try:
            meta = page.locator('meta[name="description"]').first
            if meta.count() > 0:
                content = meta.get_attribute("content") or ""
                if len(content) > 50:
                    return f"<p>{content}</p>"
        except Exception:
            pass

    except Exception as e:
        print(f"    description fetch error: {e}", flush=True)
    return ""


# ── main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="Actually patch books.json")
    args = parser.parse_args()

    books = json.load(open(BOOKS_JSON, encoding="utf-8"))["books"]

    # ── 1. Find duplicate-ASIN books ──────────────────────────────────────────
    from collections import Counter
    asin_counts = Counter(b.get("asin", "") for b in books)
    dupes = {asin for asin, c in asin_counts.items() if c > 1}

    # For each dupe group, keep one book (best match based on slug) and fix the rest
    books_needing_asin = []
    for asin in sorted(dupes):
        group = [b for b in books if b.get("asin") == asin]
        # The first book alphabetically by title might be the right one for this ASIN —
        # we'll search each individually on Amazon to get the real ASIN.
        books_needing_asin.extend(group)

    print(f"Books needing ASIN correction: {len(books_needing_asin)}")

    # ── 2. Find books without descriptions ────────────────────────────────────
    books_needing_desc = [
        b for b in books
        if not b.get("description") or len(b.get("description", "").strip()) < 50
    ]
    print(f"Books needing descriptions:    {len(books_needing_desc)}")

    # Load previously saved fixes
    asin_fixes = load_json(ASIN_FIXES_FILE)   # { slug: correct_asin }
    desc_fixes = load_json(DESC_FIXES_FILE)   # { asin: description_html }

    already_asin = set(asin_fixes.keys())
    already_desc = set(desc_fixes.keys())

    to_fix_asin = [b for b in books_needing_asin if b.get("slug") not in already_asin]
    to_fix_desc = [b for b in books_needing_desc if b.get("asin") not in already_desc]

    print(f"  Remaining ASIN lookups:      {len(to_fix_asin)}")
    print(f"  Remaining description fetches: {len(to_fix_desc)}")

    if not to_fix_asin and not to_fix_desc:
        print("\nAll lookups already cached. Run with --apply to patch books.json.")
        if args.apply:
            apply_fixes(books, asin_fixes, desc_fixes)
        return

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=False, slow_mo=50, args=["--start-maximized"]
        )
        ctx = browser.new_context(
            viewport={"width": 1400, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            locale="nl-NL",
        )
        page = ctx.new_page()

        # ── Fix ASINs ──────────────────────────────────────────────────────────
        if to_fix_asin:
            print(f"\n── Searching Amazon.nl for correct ASINs ({len(to_fix_asin)} books) ──")
            for i, b in enumerate(to_fix_asin):
                title = b.get("title", "")
                slug  = b.get("slug", "")
                print(f"  [{i+1}/{len(to_fix_asin)}] {title[:65]}", flush=True)
                found_asin, found_title = search_for_asin(page, title)
                if found_asin:
                    asin_fixes[slug] = found_asin
                    print(f"    → {found_asin}  ({found_title[:60]})", flush=True)
                else:
                    asin_fixes[slug] = "NOT_FOUND"
                    print(f"    → NOT FOUND", flush=True)
                save_json(ASIN_FIXES_FILE, asin_fixes)
                page.wait_for_timeout(2000)

        # ── Fetch descriptions ─────────────────────────────────────────────────
        if to_fix_desc:
            print(f"\n── Fetching descriptions ({len(to_fix_desc)} books) ──")
            for i, b in enumerate(to_fix_desc):
                asin  = b.get("asin", "")
                title = b.get("title", "")
                print(f"  [{i+1}/{len(to_fix_desc)}] {asin}  {title[:55]}", flush=True)
                desc = fetch_description(page, asin)
                desc_fixes[asin] = desc
                if desc:
                    print(f"    → {len(desc)} chars", flush=True)
                else:
                    print(f"    → no description found", flush=True)
                save_json(DESC_FIXES_FILE, desc_fixes)
                page.wait_for_timeout(2500)

        browser.close()

    print("\n── Done fetching. Results saved. ──")
    if args.apply:
        apply_fixes(books, asin_fixes, desc_fixes)
    else:
        print("Run with --apply to patch books.json")


def apply_fixes(books, asin_fixes, desc_fixes):
    """Apply cached ASIN and description fixes to books.json."""
    slug_map = {b["slug"]: b for b in books if b.get("slug")}

    asin_changed = 0
    desc_changed = 0

    for slug, new_asin in asin_fixes.items():
        if new_asin == "NOT_FOUND":
            continue
        b = slug_map.get(slug)
        if b and b.get("asin") != new_asin:
            print(f"  ASIN fix: [{b['asin']}→{new_asin}] {b.get('title','')[:60]}")
            b["asin"] = new_asin
            asin_changed += 1

    for asin, desc in desc_fixes.items():
        if not desc or len(desc) < 50:
            continue
        matching = [b for b in books if b.get("asin") == asin]
        for b in matching:
            if not b.get("description") or len(b.get("description", "").strip()) < 50:
                b["description"] = desc
                desc_changed += 1

    data = {"books": books}
    with open(BOOKS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nPatched books.json: {asin_changed} ASIN fixes, {desc_changed} description fills.")


if __name__ == "__main__":
    main()
