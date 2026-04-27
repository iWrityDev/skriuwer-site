#!/usr/bin/env python3
"""
Fix books.json:
1. Upgrade images-na.ssl-images-amazon.com .01.L.jpg -> m.media-amazon.com _SX1000_
2. Fix ASINs for own books whose slug is "asin-b0xxxxxx" (slug encodes the correct ASIN)
"""
import json
import re
import sys

INPUT = "data/books.json"
OUTPUT = "data/books.json"

with open(INPUT, "r", encoding="utf-8") as f:
    data = json.load(f)

books = data["books"]
print(f"Loaded {len(books)} books")

fixed_images = 0
fixed_asins = 0
skipped_asins = 0  # asin-1490353003 etc. where ISBN matches slug

for book in books:
    # --- Fix 1: Upgrade image URLs ---
    for field in ("coverImage", "coverImageFallback"):
        val = book.get(field, "")
        if val and "images-na.ssl-images-amazon.com" in val:
            # Pattern: https://images-na.ssl-images-amazon.com/images/P/{ID}.01.L.jpg
            new_val = re.sub(
                r"https://images-na\.ssl-images-amazon\.com/images/P/([^.]+)\.01\.L\.jpg",
                r"https://m.media-amazon.com/images/P/\1.01._SX1000_.jpg",
                val
            )
            if new_val != val:
                book[field] = new_val
                fixed_images += 1

    # --- Fix 2: Fix ASINs for asin-b0xxxxxx slugs ---
    slug = book.get("slug", "")
    if re.match(r"^asin-b0", slug, re.IGNORECASE):
        # Extract B0 ASIN from slug: "asin-b0dv4lpqvx" -> "B0DV4LPQVX"
        correct_asin = slug[5:].upper()  # strip "asin-" prefix, uppercase
        current_asin = book.get("asin", "")
        if current_asin != correct_asin:
            print(f"  FIX ASIN: {slug}: {current_asin!r} -> {correct_asin!r}")
            book["asin"] = correct_asin
            fixed_asins += 1
        else:
            skipped_asins += 1

print(f"\nImage URLs fixed: {fixed_images}")
print(f"ASINs fixed: {fixed_asins}")
print(f"ASINs already correct: {skipped_asins}")

# Write back with UTF-8 (no BOM), 2-space indent, ensure_ascii=False
with open(OUTPUT, "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")  # trailing newline

print(f"\nWrote {OUTPUT}")

# Verify
with open(OUTPUT, "r", encoding="utf-8") as f:
    verify = json.load(f)
print(f"Verified: {len(verify['books'])} books in output")

# Check BOM
with open(OUTPUT, "rb") as f:
    header = f.read(3)
if header == b'\xef\xbb\xbf':
    print("WARNING: BOM detected!")
else:
    print("OK: No BOM")
