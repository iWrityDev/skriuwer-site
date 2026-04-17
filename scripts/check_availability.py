"""
check_availability.py — Playwright-based Amazon.nl availability checker.

Uses a headed Chromium browser to bypass Amazon bot detection.
Checks amazon.nl because that's where Netherlands/EU visitors land via OneLink.

Usage:
    python scripts/check_availability.py           # dry run: report only
    python scripts/check_availability.py --remove  # remove unavailable books & save
    python scripts/check_availability.py --batch 0 100  # check books 0-99 only
    python scripts/check_availability.py --fresh   # ignore cached results, re-check all

Detection priority (highest confidence first):
  1. CSS: #add-to-cart-button / #buy-now-button present → "available"
  2. CSS: #availability span text → "op voorraad" / "niet op voorraad"
  3. Full page: buyable text ("in winkelwagen") → "available"
  4. Full page: very specific unavailability phrases → "unavailable"
  5. Full page: "see all buying options" (ONLY if no buyable text found) → "unavailable"
  6. → "unknown" (keep book, no false removals)

Saves progress to scripts/unavailable_asins.json every 10 checks so you can resume.
"""

import json
import sys
import os
import argparse
import random
import io
from pathlib import Path

# Fix Windows cp1252 console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("playwright not installed — run:")
    print("  pip install playwright")
    print("  playwright install chromium")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
BOOKS_JSON = SCRIPT_DIR.parent / "data" / "books.json"
RESULTS_FILE = SCRIPT_DIR / "unavailable_asins.json"
LOG_FILE = SCRIPT_DIR / "availability_debug.log"

# CSS selectors for the direct buy button — if present, book is definitely buyable
BUY_BUTTON_SELECTORS = [
    "#add-to-cart-button",
    "#buy-now-button",
    "input[name='submit.buy-now']",
]

# Text in the dedicated #availability element only
# (don't check these in the full page — they appear as boilerplate elsewhere)
AVAILABILITY_IN_STOCK_TEXT = [
    "op voorraad",        # Dutch: "in stock"
    "in stock",
    "in voorraad",
    "beschikbaar",        # Dutch: "available"
]
AVAILABILITY_OUT_TEXT = [
    "niet op voorraad",           # "not in stock"
    "momenteel niet verkrijgbaar",  # "currently unavailable"
    "tijdelijk niet op voorraad",
    "niet leverbaar",
    "vergrijpte uitgave",         # "out of print"
    "out of print",
    "currently unavailable",
    "temporarily out of stock",
    "this item is not available",
]

# Buy button TEXT found anywhere on the page — high confidence the book is buyable
BUYABLE_PAGE_STRINGS = [
    "in winkelwagen",   # Dutch "Add to Cart"
    "nu kopen",         # Dutch "Buy Now"
    "direct kopen",     # Dutch "Buy directly"
    "add to cart",
    "buy now",
    "add to basket",
]

# Specific unavailability phrases for the full-page fallback.
# Only include phrases that are very specific and NOT generic UI boilerplate.
# Do NOT include "niet beschikbaar" — it appears on every page as help text.
UNAVAILABLE_PAGE_STRINGS = [
    "momenteel niet verkrijgbaar",   # "currently unavailable" — very specific
    "niet op voorraad",              # "not in stock" — specific
    "tijdelijk niet op voorraad",    # "temporarily out of stock"
    "vergrijpte uitgave",            # "out of print"
    "out of print--limited availability",
    "out of print",
    "currently unavailable",
    "temporarily out of stock",
    "this item is not available",
]


def check_asin(page, asin: str) -> str:
    """
    Navigate to amazon.nl/dp/{asin} and determine availability.
    Returns: 'available', 'unavailable', 'unknown', or 'error:...'
    """
    url = f"https://www.amazon.nl/dp/{asin}"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2500)  # wait for JS buy box to render

        # Write debug log entry
        try:
            with open(LOG_FILE, "a", encoding="utf-8") as lf:
                lf.write(f"ASIN={asin} title={repr(page.title()[:80])} url={page.url[:80]}\n")
        except Exception:
            pass

        # --- CAPTCHA / robot check ---
        for _ in range(90):
            title = page.title().lower()
            if "robot" in title or "characters" in title or "captcha" in title or "typ de tekens" in title:
                print("  ⚠ CAPTCHA detected — solve in the browser window (waiting up to 90s)...", flush=True)
                page.wait_for_timeout(1000)
            else:
                break

        # --- 1. Buy button CSS selector (highest confidence) ---
        # Don't use is_visible() — in background processes it can fail to detect
        # visible-but-off-screen elements. count() > 0 is sufficient.
        for sel in BUY_BUTTON_SELECTORS:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    return "available"
            except Exception:
                pass

        # --- 2. #availability element text ---
        for sel in ["#availability span", "#availability"]:
            try:
                el = page.locator(sel).first
                if el.count() > 0:
                    avail_text = el.inner_text().strip().lower()
                    if avail_text:
                        # In-stock strings
                        for s in AVAILABILITY_IN_STOCK_TEXT:
                            if s in avail_text:
                                return "available"
                        # Out-of-stock strings
                        for s in AVAILABILITY_OUT_TEXT:
                            if s in avail_text:
                                return "unavailable"
            except Exception:
                pass

        # --- 3. Full page: buyable text (checked BEFORE unavailability text) ---
        try:
            content = page.content().lower()
        except Exception:
            return "unknown"

        for s in BUYABLE_PAGE_STRINGS:
            if s in content:
                return "available"

        # --- 4. Full page: specific unavailability phrases ---
        for s in UNAVAILABLE_PAGE_STRINGS:
            if s in content:
                return "unavailable"

        # --- 5. "See all buying options" = only used/third-party, no new-copy buy box ---
        if "see all buying options" in content or "alle aankoopmogelijkheden" in content:
            return "unavailable"

        # --- No signal either way — keep book, don't remove ---
        with open(LOG_FILE, "a", encoding="utf-8") as lf:
            lf.write(f"  -> unknown (no signal)\n")
        return "unknown"

    except Exception as e:
        return f"error:{type(e).__name__}"


def load_existing_results() -> dict:
    if RESULTS_FILE.exists():
        with open(RESULTS_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_results(results: dict):
    with open(RESULTS_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Check Amazon.nl availability for all books (Playwright)")
    parser.add_argument("--remove", action="store_true",
                        help="Remove unavailable books from books.json (requires --confirm)")
    parser.add_argument("--confirm", action="store_true",
                        help="Required together with --remove to actually delete books")
    parser.add_argument("--batch", nargs=2, type=int, metavar=("START", "END"),
                        help="Only check books[START:END] (0-indexed)")
    parser.add_argument("--delay", type=float, default=2.5,
                        help="Base delay between requests in seconds (default: 2.5)")
    parser.add_argument("--fresh", action="store_true",
                        help="Ignore cached results and re-check every book")
    args = parser.parse_args()

    with open(BOOKS_JSON, encoding="utf-8") as f:
        data = json.load(f)
    books = data["books"]

    # Load previously checked results (unless --fresh)
    results = {} if args.fresh else load_existing_results()
    already_checked = set(results.keys())

    if args.fresh and RESULTS_FILE.exists():
        os.remove(RESULTS_FILE)
        print("Cleared cached results (--fresh mode).")

    # Slice if batch mode
    if args.batch:
        start, end = args.batch
        to_check = books[start:end]
        print(f"Batch mode: checking books {start}–{end-1} ({len(to_check)} books)")
    else:
        to_check = books
        print(f"Checking all {len(to_check)} books on amazon.nl (Playwright)...")

    checked = 0
    skipped = 0
    unavailable_count = 0
    unknown_count = 0

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
            locale="nl-NL",
        )
        page = context.new_page()

        for i, book in enumerate(to_check):
            asin = book.get("asin")
            if not asin:
                continue

            if asin in already_checked:
                skipped += 1
                if results[asin] == "unavailable":
                    unavailable_count += 1
                continue

            status = check_asin(page, asin)
            results[asin] = status
            checked += 1

            title_short = book.get("title", "")[:65]

            if status == "unavailable":
                unavailable_count += 1
                print(f"  [NO BUY BOX] {title_short}", flush=True)
            elif status == "unknown":
                unknown_count += 1
                if checked % 20 == 0:
                    print(f"  ... {checked} checked (+{skipped} resumed) | "
                          f"{unavailable_count} no-buy-box | {unknown_count} unknown", flush=True)
            elif status.startswith("error"):
                print(f"  [ERROR] {asin}: {status}", flush=True)
            else:
                # available
                if checked % 20 == 0:
                    print(f"  ... {checked} checked (+{skipped} resumed) | "
                          f"{unavailable_count} no-buy-box | {unknown_count} unknown", flush=True)

            # Save progress every 10 checks
            if checked % 10 == 0:
                save_results(results)

            # Polite delay with jitter
            delay_ms = int((args.delay + random.uniform(0, 1.5)) * 1000)
            page.wait_for_timeout(delay_ms)

        browser.close()

    # Final save
    save_results(results)

    # Summary
    unavailable_asins = {asin for asin, status in results.items() if status == "unavailable"}
    unavailable_books = [b for b in books if b.get("asin") in unavailable_asins]

    print(f"\n{'='*60}")
    print(f"Checked: {checked} new | Resumed: {skipped} | Unknown (kept): {unknown_count}")
    print(f"No buy box on amazon.nl: {len(unavailable_books)} books")

    if unavailable_books:
        print("\nBooks with no buy box:")
        for b in unavailable_books:
            print(f"  [{b['asin']}] {b.get('title','')[:70]}")

    if args.remove and not args.confirm:
        print(f"\n⚠  --remove passed but --confirm was not. Dry run only.")
        print(f"   To actually delete, run with: --remove --confirm")

    if args.remove and args.confirm and unavailable_books:
        before = len(books)
        data["books"] = [b for b in books if b.get("asin") not in unavailable_asins]
        after = len(data["books"])
        with open(BOOKS_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\nRemoved {before - after} books. Catalog now has {after} books.")
        # Clear cache so next run starts fresh
        if RESULTS_FILE.exists():
            os.remove(RESULTS_FILE)
        print("Cleared results cache.")
    elif unavailable_books and not (args.remove and args.confirm):
        print(f"\nDry run — run with --remove --confirm to delete these {len(unavailable_books)} books.")


if __name__ == "__main__":
    main()
