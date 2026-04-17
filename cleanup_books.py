import json
import re
import sys
from collections import defaultdict

# Force UTF-8 output so arrow characters print on Windows
sys.stdout.reconfigure(encoding="utf-8")

INPUT_PATH = r"C:\Users\aukeh\skriuwer-site\data\books.json"

with open(INPUT_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

books = data["books"]
total_before = len(books)
print(f"Total books before: {total_before}")

# ── STEP 1: Upgrade Google Books image URLs ──────────────────────────────────
image_upgrades = 0
for book in books:
    cover = book.get("coverImage", "")
    if "books.google.com" in cover:
        new_cover = re.sub(r"zoom=[012](?=&|$)", "zoom=5", cover)
        if new_cover != cover:
            book["coverImage"] = new_cover
            image_upgrades += 1

print(f"\nStep 1 – Image URLs upgraded: {image_upgrades}")

# ── STEP 2: Remove asin-* duplicate books ────────────────────────────────────

def normalize_title(title):
    return re.sub(r"[^a-z0-9]", "", title.lower())

# Build lookup maps from non-asin-* books
asin_to_proper_slug = {}   # asin -> slug  (proper books only)
title_norm_to_proper = {}  # normalized title -> slug  (proper books only)

for book in books:
    slug = book.get("slug", "")
    if not slug.startswith("asin-"):
        asin = book.get("asin", "")
        if asin:
            asin_to_proper_slug[asin] = slug
        t_norm = normalize_title(book.get("title", ""))
        if t_norm:
            title_norm_to_proper[t_norm] = slug

slugs_to_remove = set()
remove_reasons = []

for book in books:
    slug = book.get("slug", "")
    if not slug.startswith("asin-"):
        continue
    asin = book.get("asin", "")
    t_norm = normalize_title(book.get("title", ""))

    # (a) same ASIN with a proper slug
    if asin and asin in asin_to_proper_slug:
        proper = asin_to_proper_slug[asin]
        remove_reasons.append(
            f"  REMOVE (asin-dup ASIN match): {slug!r}  →  kept as {proper!r}"
        )
        slugs_to_remove.add(slug)
        continue

    # (b) very similar title with a proper slug
    if t_norm and t_norm in title_norm_to_proper:
        proper = title_norm_to_proper[t_norm]
        remove_reasons.append(
            f"  REMOVE (asin-dup title match): {slug!r}  →  kept as {proper!r}"
        )
        slugs_to_remove.add(slug)
        continue

for r in remove_reasons:
    print(r)

books = [b for b in books if b.get("slug", "") not in slugs_to_remove]
removed_count = len(remove_reasons)
print(f"\nStep 2 – asin-* duplicates removed: {removed_count}")

# ── STEP 3: Fix slug collisions ──────────────────────────────────────────────
slug_groups = defaultdict(list)
for book in books:
    slug_groups[book.get("slug", "")].append(book)

renames = 0
for slug, group in slug_groups.items():
    if len(group) < 2:
        continue
    # Sort: isOwnBook=True first, then higher reviewCount first
    group.sort(key=lambda b: (not b.get("isOwnBook", False), -(b.get("reviewCount") or 0)))
    # Keep first as-is; rename the rest
    for dupe in group[1:]:
        asin = dupe.get("asin", "")
        suffix = asin[-6:] if len(asin) >= 6 else asin
        new_slug = f"{slug}-{suffix}"
        print(f"  RENAME collision: {slug!r} → {new_slug!r}  (title: {dupe.get('title','')!r})")
        dupe["slug"] = new_slug
        renames += 1

print(f"\nStep 3 – Slug collisions renamed: {renames}")

# ── STEP 4: Strip `fiction` from non-fiction books ───────────────────────────
NON_FICTION_CATS = {
    "history", "mythology", "dark-history", "conspiracy", "religion",
    "biography", "science", "language-learning", "frisian", "self-help",
    "psychology", "business", "true-crime", "philosophy"
}

fiction_stripped = 0
for book in books:
    cats = book.get("categories", [])
    if "fiction" in cats and any(c in NON_FICTION_CATS for c in cats):
        book["categories"] = [c for c in cats if c != "fiction"]
        fiction_stripped += 1

print(f"\nStep 4 – 'fiction' stripped from non-fiction books: {fiction_stripped}")

# ── STEP 5: Fix specific wrong categories ────────────────────────────────────
specific_fixes = 0

for book in books:
    slug = book.get("slug", "")
    cats = book.get("categories", [])

    # getting-started-with-engineering  →  science
    if "getting-started-with-engineering" in slug and cats == ["fiction"]:
        book["categories"] = ["science"]
        print(f"  FIX category: {slug!r}  ['fiction'] → ['science']")
        specific_fixes += 1
        continue

    # albert-einstein  →  biography
    if "albert-einstein" in slug and cats == ["fiction"]:
        book["categories"] = ["biography"]
        print(f"  FIX category: {slug!r}  ['fiction'] → ['biography']")
        specific_fixes += 1
        continue

    # marie-curie  →  biography + science
    if "marie-curie" in slug and cats == ["fiction"]:
        book["categories"] = ["biography", "science"]
        print(f"  FIX category: {slug!r}  ['fiction'] → ['biography', 'science']")
        specific_fixes += 1
        continue

    # ancient-greece / ancient-egypt  →  history
    if ("ancient-greece" in slug or "ancient-egypt" in slug) and cats == ["fiction"]:
        book["categories"] = ["history"]
        print(f"  FIX category: {slug!r}  ['fiction'] → ['history']")
        specific_fixes += 1
        continue

    # machine-learning: remove history, add science
    if "machine-learning" in slug and "history" in cats:
        cats = [c for c in cats if c != "history"]
        if "science" not in cats:
            cats.append("science")
        book["categories"] = cats
        print(f"  FIX category: {slug!r}  removed 'history', ensured 'science'")
        specific_fixes += 1
        continue

    # introduction-to-greek-mythology  →  mythology
    if slug.startswith("introduction-to-greek-mythology") and cats == ["fiction"]:
        book["categories"] = ["mythology"]
        print(f"  FIX category: {slug!r}  ['fiction'] → ['mythology']")
        specific_fixes += 1
        continue

print(f"\nStep 5 – Specific category fixes: {specific_fixes}")

# ── STEP 6: Write cleaned file ───────────────────────────────────────────────
data["books"] = books
with open(INPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

total_after = len(books)
print(f"\n{'='*50}")
print(f"SUMMARY")
print(f"  Books before      : {total_before}")
print(f"  Books after       : {total_after}")
print(f"  Removed           : {total_before - total_after}")
print(f"  Image URLs upgraded: {image_upgrades}")
print(f"  Fiction stripped  : {fiction_stripped}")
print(f"  Slug renames      : {renames}")
print(f"  Specific cat fixes: {specific_fixes}")
print(f"  Written to        : {INPUT_PATH}")
