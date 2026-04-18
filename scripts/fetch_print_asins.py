"""
fetch_print_asins.py — Find paperback ASINs for own books that only have a Kindle (B0*) ASIN.

For each B0 own book, visits amazon.com/dp/{B0_ASIN} and looks for the
Paperback format link in the format switcher. If found, replaces the B0
ASIN in books.json with the print ASIN and rebuilds the marketplace URLs.

Usage:
    python scripts/fetch_print_asins.py              # dry run: print what it found
    python scripts/fetch_print_asins.py --save       # write results to books.json
    python scripts/fetch_print_asins.py --fresh      # ignore cache, re-scrape
    python scripts/fetch_print_asins.py --delay 3    # slower if Amazon is blocking

Progress cached in scripts/print_asin_cache.json — safe to resume after interruption.
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
    print("playwright not installed — run: pip install playwright && playwright install chromium")
    sys.exit(1)

SCRIPT_DIR  = Path(__file__).parent
BOOKS_JSON  = SCRIPT_DIR.parent / "data" / "books.json"
CACHE_FILE  = SCRIPT_DIR / "print_asin_cache.json"


def build_marketplaces(asin: str) -> dict:
    return {
        "amazon.com":    f"https://www.amazon.com/dp/{asin}",
        "amazon.de":     f"https://www.amazon.de/dp/{asin}",
        "amazon.co.uk":  f"https://www.amazon.co.uk/dp/{asin}",
        "amazon.nl":     f"https://www.amazon.nl/dp/{asin}",
    }


def find_paperback_asin(page, b0_asin: str) -> str | None:
    """
    Visit the B0 Kindle page and return the paperback ASIN, or None if not found.
    """
    url = f"https://www.amazon.com/dp/{b0_asin}"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2500)

        # CAPTCHA check
        for _ in range(90):
            title = page.title().lower()
            if any(k in title for k in ("robot", "captcha", "characters", "enter the characters")):
                print("  ⚠ CAPTCHA — solve in browser (waiting up to 90s)...", flush=True)
                page.wait_for_timeout(1000)
            else:
                break

        # ── Strategy 1: format switcher #tmmSwatches ────────────────────────
        # Amazon's format swatch grid: each format has an <a href="/dp/{ASIN}...">
        # We want any ASIN that is NOT the current B0 ASIN and looks like a print ASIN
        try:
            swatches = page.locator("#tmmSwatches a[href*='/dp/']").all()
            for el in swatches:
                href = el.get_attribute("href") or ""
                m = re.search(r"/dp/([A-Z0-9]{10})", href)
                if not m:
                    continue
                candidate = m.group(1)
                if candidate == b0_asin:
                    continue
                if candidate.startswith("B0"):
                    continue  # another Kindle edition
                # Check if "Paperback" or "Taschenbuch" appears in the button text
                text = (el.inner_text() or "").lower()
                if any(k in text for k in ("paperback", "taschenbuch", "broché", "tascabile", "rústica", "paperback")):
                    return candidate
            # If no "Paperback" label found but there's exactly one non-B0 ASIN, use it
            candidates = []
            for el in swatches:
                href = el.get_attribute("href") or ""
                m = re.search(r"/dp/([A-Z0-9]{10})", href)
                if m and m.group(1) != b0_asin and not m.group(1).startswith("B0"):
                    candidates.append(m.group(1))
            if len(candidates) == 1:
                return candidates[0]
        except Exception:
            pass

        # ── Strategy 2: scan full page HTML for print ASIN links ────────────
        # Look for links that point to /dp/{non-B0 ASIN} near "Paperback" text
        try:
            html = page.content()
            # Find all dp links
            dp_links = re.findall(r"/dp/([A-Z0-9]{10})", html)
            # Filter to non-B0, numeric-start ASINs (ISBNs often start with digits)
            print_candidates = [a for a in dp_links if a != b0_asin and not a.startswith("B0")]
            if print_candidates:
                # Most common non-B0 ASIN is likely the print edition
                from collections import Counter
                counts = Counter(print_candidates)
                most_common = counts.most_common(1)[0][0]
                return most_common
        except Exception:
            pass

        return None

    except Exception as e:
        print(f"  [ERROR] {b0_asin}: {type(e).__name__}", flush=True)
        return None


def load_cache() -> dict:
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Scrape paperback ASINs for own Kindle-only books")
    parser.add_argument("--save",  action="store_true", help="Write updated ASINs to books.json")
    parser.add_argument("--fresh", action="store_true", help="Ignore cache, re-scrape all")
    parser.add_argument("--delay", type=float, default=2.5, help="Base delay between requests (default: 2.5s)")
    parser.add_argument("--limit", type=int, default=0,    help="Only process first N books (0 = all)")
    args = parser.parse_args()

    with open(BOOKS_JSON, encoding="utf-8") as f:
        data = json.load(f)
    books = data["books"]

    # Target: own books with B0 ASINs
    targets = [b for b in books if b.get("isOwnBook") and (b.get("asin") or "").startswith("B0")]
    if args.limit:
        targets = targets[: args.limit]

    print(f"Books to check : {len(targets)}")
    print(f"Save mode      : {'YES — will update books.json' if args.save else 'dry run (--save to write)'}")
    print(f"Cache          : {'fresh' if args.fresh else 'resuming from cache'}")
    print()

    cache = {} if args.fresh else load_cache()

    found = 0
    not_found = 0
    skipped = 0

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
            b0_asin = book["asin"]
            title   = book.get("title", "")[:60]

            if b0_asin in cache:
                skipped += 1
                print_asin = cache[b0_asin]
                if print_asin and args.save:
                    book["asin"]        = print_asin
                    book["marketplaces"] = build_marketplaces(print_asin)
                if print_asin:
                    found += 1
                else:
                    not_found += 1
                continue

            print(f"  [{i+1}/{len(targets)}] {b0_asin}  {title}", flush=True)

            print_asin = find_paperback_asin(page, b0_asin)
            cache[b0_asin] = print_asin  # None = no print edition found

            if print_asin:
                print(f"    → paperback ASIN: {print_asin}", flush=True)
                found += 1
                if args.save:
                    book["asin"]        = print_asin
                    book["marketplaces"] = build_marketplaces(print_asin)
            else:
                print(f"    → no paperback found (Kindle-only?)", flush=True)
                not_found += 1

            # Save cache every 10 books
            if (found + not_found) % 10 == 0:
                save_cache(cache)

            delay_ms = int((args.delay + random.uniform(0, 1.5)) * 1000)
            page.wait_for_timeout(delay_ms)

        browser.close()

    save_cache(cache)

    if args.save:
        data["books"] = books
        with open(BOOKS_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\nSaved to {BOOKS_JSON}")

    print(f"\n{'='*55}")
    print(f"Targets            : {len(targets)}")
    print(f"Resumed from cache : {skipped}")
    print(f"Paperback found    : {found}")
    print(f"No paperback       : {not_found}")
    print(f"{'books.json updated' if args.save else 'Dry run — add --save to write'}")


if __name__ == "__main__":
    main()
