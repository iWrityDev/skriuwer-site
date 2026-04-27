#!/usr/bin/env python3
"""
Remove third-party books with broken/placeholder covers (< 5000 bytes).
Re-fetches each cover URL to get accurate size.
"""
import json, os, time, urllib.request

os.chdir("C:/Users/aukeh/skriuwer-site")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

all_books = data["books"]
third = [b for b in all_books if not b.get("isOwnBook")]
own   = [b for b in all_books if b.get("isOwnBook")]

print(f"Own books: {len(own)}")
print(f"Third-party before: {len(third)}\n")

def fetch_size(url, timeout=8):
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        })
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read()
            return len(body)
    except Exception:
        return 0

KEEP_THIRD = []
REMOVED = []

for i, book in enumerate(third):
    title = book.get("title", "")[:40]
    cover = book.get("coverImage", "")
    size = 0

    if cover and cover.startswith("http"):
        size = fetch_size(cover)

    keep = size >= 5000
    if keep:
        KEEP_THIRD.append(book)
        tag = "KEEP"
    else:
        REMOVED.append(book)
        tag = "REMOVE"

    print(f"[{i+1:2d}/{len(third)}] {tag:6s} | {size:7d}B | {title}")
    time.sleep(0.2)

print(f"\n--- Results ---")
print(f"Keeping: {len(KEEP_THIRD)} third-party books")
print(f"Removing {len(REMOVED)} books with broken/placeholder covers:")
for b in REMOVED:
    print(f"  - {b['title'][:60]}")

# Rebuild books list: own books first, then kept third-party
data["books"] = own + KEEP_THIRD

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"\nSaved data/books.json with {len(own)} own + {len(KEEP_THIRD)} third-party = {len(own)+len(KEEP_THIRD)} total books")

# Verify
with open("data/books.json", "r", encoding="utf-8") as f:
    v = json.load(f)
print(f"Verified: {len(v['books'])} books in file")
with open("data/books.json", "rb") as f:
    print("BOM check:", "OK (no BOM)" if f.read(3) != b'\xef\xbb\xbf' else "WARNING: BOM!")
