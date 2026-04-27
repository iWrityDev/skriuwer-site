#!/usr/bin/env python3
"""
Comprehensive verification of third-party books:
1. Check if cover image is a real cover (not OL placeholder ~807 bytes)
2. Verify ASIN/ISBN via Open Library API - does it match our book title?
3. Output JSON report of books to keep vs remove
"""
import json, os, time, urllib.request, urllib.error, difflib

os.chdir("C:/Users/aukeh/skriuwer-site")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

third = [b for b in data["books"] if not b.get("isOwnBook")]
print(f"Checking {len(third)} third-party books...\n")

KEEP = []
REMOVE_COVER = []
REMOVE_ASIN = []
REMOVE_BOTH = []

def fetch_url(url, timeout=10):
    """Fetch URL, return (status, content_length, content_type, body_size)"""
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read()
            ct = resp.headers.get("Content-Type", "")
            return resp.status, len(body), ct
    except Exception as e:
        return None, 0, str(e)

def check_openlibrary_isbn(isbn):
    """Use Open Library API to get book title for an ISBN."""
    url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0"
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read()
            obj = json.loads(body)
            key = f"ISBN:{isbn}"
            if key in obj and "title" in obj[key]:
                return obj[key]["title"]
            return None
    except Exception:
        return None

def title_similarity(a, b):
    """Return 0-1 similarity between two titles (case-insensitive)."""
    a = a.lower().strip()
    b = b.lower().strip()
    return difflib.SequenceMatcher(None, a, b).ratio()

results = []

for i, book in enumerate(third):
    slug  = book.get("slug", "")
    asin  = book.get("asin", "")
    cover = book.get("coverImage", "")
    title = book.get("title", "")

    cover_ok = False
    asin_ok  = False
    ol_title = None
    cover_size = 0

    # --- Check cover image ---
    if cover and cover.startswith("http"):
        status, size, ct = fetch_url(cover)
        cover_size = size
        if status == 200:
            # Open Library: real cover ≈ 5KB–100KB; "no cover" placeholder ≈ 800–2000 bytes
            # Google Books: real cover typically > 3KB
            if "openlibrary.org" in cover:
                cover_ok = size > 5000   # OL placeholder is ~807B or ~1.4KB
            elif "books.google.com" in cover:
                cover_ok = size > 2000   # Google Books real cover > 2KB
            else:
                cover_ok = True
        else:
            cover_ok = False

    # --- Check ASIN / ISBN via Open Library ---
    if asin and len(asin) == 10:
        ol_title = check_openlibrary_isbn(asin)
        if ol_title:
            sim = title_similarity(title, ol_title)
            asin_ok = sim >= 0.4  # At least 40% similar title
        else:
            # OL has no record for this ISBN — could still be valid
            # Consider it OK if it passes basic ISBN-10 format check
            import re
            asin_ok = bool(re.match(r'^[0-9]{9}[0-9X]$', asin))
    elif asin and asin.startswith("B0"):
        asin_ok = True  # Kindle ASIN, not checkable via OL
    else:
        asin_ok = False

    status_str = "OK" if (cover_ok and asin_ok) else ""
    if not cover_ok and not asin_ok:
        status_str = "REMOVE_BOTH"
        REMOVE_BOTH.append(book)
    elif not cover_ok:
        status_str = "BAD_COVER"
        REMOVE_COVER.append(book)
    elif not asin_ok:
        status_str = "BAD_ASIN"
        REMOVE_ASIN.append(book)
    else:
        KEEP.append(book)

    sim_str = f"OL='{ol_title[:35]}' sim={title_similarity(title,ol_title):.2f}" if ol_title else "OL=not_found"
    print(f"[{i+1:2d}/{len(third)}] {status_str:12s} | cover={cover_size:7d}B | {title[:35]:35s} | {sim_str}")

    results.append({
        "slug": slug,
        "title": title,
        "asin": asin,
        "cover_ok": cover_ok,
        "cover_size": cover_size,
        "asin_ok": asin_ok,
        "ol_title": ol_title,
    })

    time.sleep(0.3)  # polite

print(f"\n{'='*70}")
print(f"SUMMARY: {len(third)} third-party books")
print(f"  ✓ KEEP:          {len(KEEP)}")
print(f"  ✗ Bad cover only: {len(REMOVE_COVER)}")
print(f"  ✗ Bad ASIN only:  {len(REMOVE_ASIN)}")
print(f"  ✗ Both bad:       {len(REMOVE_BOTH)}")
print(f"  TOTAL REMOVE:    {len(REMOVE_COVER)+len(REMOVE_ASIN)+len(REMOVE_BOTH)}")

# Write results
with open("verify_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nWrote verify_results.json")
