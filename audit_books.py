#!/usr/bin/env python3
"""
Audit third-party books for:
1. Broken/placeholder cover images (Open Library returns tiny placeholders for unknown ISBNs)
2. Dead Amazon ASINs (product page returns 404 / wrong book)
"""
import json
import urllib.request
import urllib.error
import time

INPUT = "data/books.json"

with open(INPUT, "r", encoding="utf-8") as f:
    data = json.load(f)

third_party = [b for b in data["books"] if not b.get("isOwnBook")]
print(f"Auditing {len(third_party)} third-party books...\n")

BROKEN_COVER = []
BROKEN_ASIN  = []
OK           = []

def fetch_head(url, timeout=8):
    """Return (status_code, content_length, content_type) or None on error."""
    try:
        req = urllib.request.Request(url, method="HEAD", headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            cl = resp.headers.get("Content-Length", "0")
            ct = resp.headers.get("Content-Type", "")
            return resp.status, int(cl or 0), ct
    except Exception as e:
        return None, 0, str(e)

for i, book in enumerate(third_party):
    slug  = book["slug"]
    asin  = book.get("asin", "")
    cover = book.get("coverImage", "")
    title = book.get("title", "")[:50]

    cover_ok = False
    asin_ok  = False

    # --- Check cover image ---
    if cover and cover.startswith("http"):
        if "openlibrary.org" in cover or "books.google.com" in cover:
            # For Open Library: a real cover is typically >5KB; placeholder is ~1-2KB
            status, size, ct = fetch_head(cover)
            if status == 200 and size > 3000:
                cover_ok = True
            elif status == 200 and size == 0:
                # Size unknown from HEAD — assume ok for google books
                if "books.google.com" in cover:
                    cover_ok = True
                else:
                    cover_ok = False  # Open Library placeholder
            else:
                cover_ok = False
        else:
            cover_ok = True  # Assume other sources ok
    else:
        cover_ok = False

    # --- Check Amazon ASIN ---
    if asin:
        amazon_url = f"https://www.amazon.com/dp/{asin}"
        # We can't reliably check Amazon from server-side (bot blocking)
        # Instead check if the ISBN is in Open Library and matches the book
        # For now, flag if ASIN doesn't look like a real ISBN (wrong format)
        # Real ISBN-10: 10 digits or 9 digits + X
        import re
        if re.match(r'^[0-9]{9}[0-9X]$', asin):
            asin_ok = True  # Looks like a valid ISBN-10 format
        elif re.match(r'^B0[A-Z0-9]{8}$', asin):
            asin_ok = True  # B0 ASIN (Kindle)
        else:
            asin_ok = False
    else:
        asin_ok = False

    status_str = []
    if not cover_ok:
        status_str.append("BROKEN_COVER")
        BROKEN_COVER.append(book)
    if not asin_ok:
        status_str.append("BAD_ASIN_FORMAT")
        BROKEN_ASIN.append(book)
    if cover_ok and asin_ok:
        OK.append(book)
        status_str.append("ok")

    print(f"[{i+1:2d}/{len(third_party)}] {','.join(status_str):25s} | {asin:12s} | cover={size:6d}B | {title}")
    time.sleep(0.15)  # polite rate limiting for Open Library

print(f"\n{'='*60}")
print(f"SUMMARY: {len(third_party)} third-party books")
print(f"  ✓ OK:            {len(OK)}")
print(f"  ✗ Broken cover:  {len(BROKEN_COVER)}")
print(f"  ✗ Bad ASIN fmt:  {len(BROKEN_ASIN)}")
print(f"\nBroken cover slugs:")
for b in BROKEN_COVER:
    print(f"  {b['slug']} | cover: {b.get('coverImage','')[:70]}")
print(f"\nBad ASIN slugs:")
for b in BROKEN_ASIN:
    print(f"  {b['slug']} | asin: {b.get('asin','')}")
