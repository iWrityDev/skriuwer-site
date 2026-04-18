"""
clean_books.py — One-shot catalog cleanup for Skriuwer.

1. Removes ALL third-party books (isOwnBook: false) — they are all junk.
2. Re-applies every admin deletion from git history.
3. Deduplicates own books by ASIN — same ASIN = same book, keep highest reviews.
4. Removes own books dated 2025 or earlier.
5. Writes data/deleted_slugs.json — persistent blocklist for all future scripts.

Run:
    python scripts/clean_books.py              # dry run
    python scripts/clean_books.py --save       # write changes
"""

import json, sys, argparse, subprocess
from pathlib import Path
from collections import defaultdict

SCRIPT_DIR   = Path(__file__).parent
BOOKS_JSON   = SCRIPT_DIR.parent / "data" / "books.json"
DELETED_JSON = SCRIPT_DIR.parent / "data" / "deleted_slugs.json"


def get_admin_deleted_slugs() -> set:
    try:
        result = subprocess.run(
            ["git", "log", "--oneline"],
            capture_output=True, text=True, cwd=SCRIPT_DIR.parent
        )
        slugs = set()
        for line in result.stdout.splitlines():
            if "Admin: remove book" in line:
                slug = line.split("Admin: remove book")[-1].strip()
                slugs.add(slug)
        return slugs
    except Exception as e:
        print(f"  [warn] could not read git log: {e}")
        return set()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--save", action="store_true")
    args = parser.parse_args()

    with open(BOOKS_JSON, encoding="utf-8") as f:
        data = json.load(f)
    books = data["books"]

    admin_slugs = get_admin_deleted_slugs()
    existing_deleted = set()
    if DELETED_JSON.exists():
        with open(DELETED_JSON, encoding="utf-8") as f:
            existing_deleted = set(json.load(f))
    all_deleted = admin_slugs | existing_deleted

    removed_third  = []
    removed_admin  = []
    removed_old    = []
    kept           = []

    for b in books:
        slug = b["slug"]
        if not b.get("isOwnBook"):
            removed_third.append(slug); all_deleted.add(slug); continue
        if slug in admin_slugs:
            removed_admin.append(slug); all_deleted.add(slug); continue
        pub = b.get("publishedDate") or ""
        if pub and pub[:4].isdigit() and int(pub[:4]) <= 2025:
            removed_old.append(f"{slug} ({pub})"); all_deleted.add(slug); continue
        kept.append(b)

    # Deduplicate by ASIN — keep highest reviewCount
    seen: dict = {}
    removed_dups = []
    for b in kept:
        asin = b.get("asin")
        if not asin:
            continue
        if asin not in seen:
            seen[asin] = b
        else:
            existing = seen[asin]
            if b.get("reviewCount", 0) > existing.get("reviewCount", 0):
                removed_dups.append(existing["slug"]); all_deleted.add(existing["slug"])
                seen[asin] = b
            else:
                removed_dups.append(b["slug"]); all_deleted.add(b["slug"])

    no_asin = [b for b in kept if not b.get("asin")]
    deduped = list(seen.values()) + no_asin
    deduped.sort(key=lambda b: (-(b.get("reviewCount") or 0), b.get("title", "")))

    print(f"Original         : {len(books)}")
    print(f"  -3rd-party     : {len(removed_third)}")
    print(f"  -admin deleted : {len(removed_admin)}")
    print(f"  -old dated     : {len(removed_old)}")
    print(f"  -duplicates    : {len(removed_dups)}")
    print(f"Final            : {len(deduped)}")
    print(f"Deleted list size: {len(all_deleted)}")

    if args.save:
        data["books"] = deduped
        with open(BOOKS_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        with open(DELETED_JSON, "w", encoding="utf-8") as f:
            json.dump(sorted(all_deleted), f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(deduped)} books and {len(all_deleted)} deleted slugs")
    else:
        print("\nDry run — add --save to write")

if __name__ == "__main__":
    main()
