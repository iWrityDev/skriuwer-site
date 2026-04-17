"""
check_availability.py — Scan all books in books.json for out-of-print / unavailable
Amazon listings, then optionally remove them.

Usage:
    python scripts/check_availability.py           # dry run: report only
    python scripts/check_availability.py --remove  # remove unavailable books & save
    python scripts/check_availability.py --batch 0 200   # check books 0-199 only

The script checks amazon.com/dp/{ASIN} for known unavailability strings:
  - "Out of Print--Limited Availability"
  - "Currently unavailable"
  - "This item is not available"
  - "Unavailable"  (buy-box area)
  - No "Add to Cart" AND no "Buy Now" button at all

Writes results to scripts/unavailable_asins.json so you can resume or inspect them.
"""

import json
import os
import re
import sys
import time
import random
import argparse
from pathlib import Path

try:
    import requests
except ImportError:
    print("requests not installed — run: pip install requests")
    sys.exit(1)

# Fix Windows cp1252 console encoding — allow printing any Unicode book title
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).parent
BOOKS_JSON = SCRIPT_DIR.parent / "data" / "books.json"
RESULTS_FILE = SCRIPT_DIR / "unavailable_asins.json"

# Strings that indicate a book is not purchasable
UNAVAILABLE_STRINGS = [
    "out of print--limited availability",
    "out of print",
    "currently unavailable",
    "this item is not available",
    "temporarily out of stock",  # different from out-of-print, but still not buyable
]

# The presence of these strings means the book IS buyable — used as sanity check
BUYABLE_STRINGS = [
    "add to cart",
    "buy now",
    "add to basket",
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}


def check_asin(session, asin: str) -> str:
    """
    Returns:
      'unavailable' — clearly out of print / unavailable
      'available'   — has a buy button
      'blocked'     — Amazon blocked the request (CAPTCHA / 503)
      'error'       — network / unexpected error
    """
    url = f"https://www.amazon.com/dp/{asin}"
    try:
        resp = session.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code in (503, 429):
            return "blocked"
        if resp.status_code == 404:
            return "unavailable"
        if resp.status_code != 200:
            return f"error:{resp.status_code}"

        page = resp.text.lower()

        # CAPTCHA / bot detection
        if "enter the characters you see below" in page or "robot check" in page:
            return "blocked"

        # EXPLICIT unavailability — only flag if Amazon directly says so.
        # Do NOT infer unavailability from a missing buy button: Amazon often
        # hides the buy button for non-US IPs without the book being out of print.
        for s in UNAVAILABLE_STRINGS:
            if s in page:
                return "unavailable"

        # Has a buy button → definitely available
        for s in BUYABLE_STRINGS:
            if s in page:
                return "available"

        # Neither explicit unavailability nor a buy button — could be geo-blocked
        # or Amazon's bot detection serving a stripped page. Mark as unknown so
        # we don't falsely remove books.
        return "unknown"

    except requests.exceptions.RequestException as e:
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
    parser = argparse.ArgumentParser(description="Check Amazon availability for all books")
    parser.add_argument("--remove", action="store_true", help="Remove unavailable books from books.json")
    parser.add_argument("--batch", nargs=2, type=int, metavar=("START", "END"),
                        help="Only check books[START:END] (0-indexed)")
    parser.add_argument("--delay", type=float, default=2.5,
                        help="Base delay between requests in seconds (default: 2.5)")
    args = parser.parse_args()

    with open(BOOKS_JSON, encoding="utf-8") as f:
        data = json.load(f)
    books = data["books"]

    # Load previously checked results so we can resume
    results = load_existing_results()
    already_checked = set(results.keys())

    # Slice if batch mode
    if args.batch:
        start, end = args.batch
        to_check = books[start:end]
        print(f"Batch mode: checking books {start} to {end-1} ({len(to_check)} books)")
    else:
        to_check = books
        print(f"Checking all {len(to_check)} books...")

    session = requests.Session()
    session.headers.update(HEADERS)

    checked = 0
    skipped = 0
    unavailable_count = 0
    blocked_count = 0

    for i, book in enumerate(to_check):
        asin = book.get("asin")
        if not asin:
            continue

        if asin in already_checked:
            skipped += 1
            if results[asin] == "unavailable":
                unavailable_count += 1
            continue

        status = check_asin(session, asin)
        results[asin] = status
        checked += 1

        if status == "unavailable":
            unavailable_count += 1
            print(f"  [OUT OF PRINT] {book['title'][:70]}")
        elif status == "blocked":
            blocked_count += 1
            print(f"  [BLOCKED] ASIN {asin} — Amazon blocked request #{checked}")
        elif status == "unknown":
            if checked % 25 == 0:
                print(f"  ... checked {checked} (+ {skipped} resumed) | {unavailable_count} unavailable so far")
        elif status.startswith("error"):
            print(f"  [ERROR] ASIN {asin}: {status}")
        else:
            # available — only print every 25 to keep output manageable
            if checked % 25 == 0:
                print(f"  ... checked {checked} (+ {skipped} resumed) | {unavailable_count} unavailable so far")

        # Save after every 10 checks so we can resume
        if checked % 10 == 0:
            save_results(results)

        # Delay — add jitter to avoid detection
        delay = args.delay + random.uniform(0, 1.5)
        time.sleep(delay)

    # Final save
    save_results(results)

    # Summary
    unavailable_asins = {asin for asin, status in results.items() if status == "unavailable"}
    unavailable_books = [b for b in books if b.get("asin") in unavailable_asins]

    print(f"\n{'='*60}")
    print(f"Checked: {checked} new | Resumed: {skipped} | Blocked: {blocked_count}")
    print(f"Unavailable / out-of-print: {len(unavailable_books)} books")

    if unavailable_books:
        print("\nOut-of-print books:")
        for b in unavailable_books:
            print(f"  [{b['asin']}] {b['title'][:70]}")

    if args.remove and unavailable_books:
        before = len(books)
        data["books"] = [b for b in books if b.get("asin") not in unavailable_asins]
        after = len(data["books"])
        with open(BOOKS_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\nRemoved {before - after} books. Catalog now has {after} books.")
        # Clear results file so next run starts fresh
        os.remove(RESULTS_FILE)
        print("Cleared results cache.")
    elif unavailable_books and not args.remove:
        print(f"\nDry run — run with --remove to delete these {len(unavailable_books)} books.")


if __name__ == "__main__":
    main()
