#!/usr/bin/env python3
"""
Fix dead Amazon ASINs for third-party books.
- Removes 3 niche/German books with dead/wrong ASINs
- Updates 11 popular books with correct Amazon ASINs
- Updates all marketplace URLs + coverImageFallback URLs
"""
import json, os, re

os.chdir("C:/Users/aukeh/skriuwer-site")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Slugs to REMOVE entirely
REMOVE_SLUGS = {
    "the-crypto-book-how-to-invest-safely-in-bitcoin-and-other-cryptocurrencies",
    "bitcoin-and-cryptocurrency-trading-for-beginners-novice-to-expert-3-books-in-1",
    "steve-jobs-die-autorisierte-biografie-des-apple-gr-nders-der-welt-bestseller-mit",
}

# Slug → new ASIN (verified live on Amazon)
ASIN_FIXES = {
    "quiet-the-power-of-introverts-in-a-world-that-cant-stop-talking": "0307352153",
    "the-leadership-challenge":                                         "1119736129",
    "the-warmth-of-other-suns-wilkerson":                               "0679763880",
    "rubicon-holland":                                                  "1400078970",
    "why-we-sleep-walker":                                              "1501144324",
    "mindset-dweck":                                                    "0345472322",
    "the-power-of-now-tolle":                                           "1577314808",
    "astrophysics-for-people-in-a-hurry-tyson":                         "0393609391",
    "the-gene-mukherjee":                                               "147673352X",
    "influence-cialdini":                                               "0062937650",
    "behold-a-pale-horse-cooper":                                       "0929385225",
}

TAG = "31813-20"

def make_marketplace_url(domain, asin, tag=TAG):
    return f"https://www.{domain}/dp/{asin}?tag={tag}"

def make_cover_fallback(asin):
    return f"https://m.media-amazon.com/images/P/{asin}.01._SX1000_.jpg"

before_count = len(data["books"])
fixed = 0
removed = 0

new_books = []
for book in data["books"]:
    slug = book.get("slug", "")

    if slug in REMOVE_SLUGS:
        print(f"  REMOVE: {book['title'][:60]}")
        removed += 1
        continue

    if slug in ASIN_FIXES:
        old_asin = book.get("asin", "")
        new_asin = ASIN_FIXES[slug]
        print(f"  FIX:    {old_asin} -> {new_asin}  | {book['title'][:45]}")

        book["asin"] = new_asin

        # Update marketplace URLs
        book["marketplaces"] = {
            "amazon_us": make_marketplace_url("amazon.com", new_asin),
            "amazon_uk": make_marketplace_url("amazon.co.uk", new_asin),
            "amazon_de": make_marketplace_url("amazon.de",  new_asin),
            "amazon_nl": make_marketplace_url("amazon.nl",  new_asin),
        }

        # Update coverImageFallback if it was an Amazon CDN URL
        fb = book.get("coverImageFallback", "")
        if "m.media-amazon.com" in fb or "images-na.ssl-images-amazon.com" in fb:
            book["coverImageFallback"] = make_cover_fallback(new_asin)

        fixed += 1

    new_books.append(book)

data["books"] = new_books
after_count = len(data["books"])

print(f"\nBefore: {before_count} books")
print(f"Removed: {removed}")
print(f"ASINs fixed: {fixed}")
print(f"After: {after_count} books")

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"\nSaved data/books.json")

# Verify
with open("data/books.json", "r", encoding="utf-8") as f:
    v = json.load(f)
print(f"Verified: {len(v['books'])} books")
with open("data/books.json", "rb") as f:
    print("BOM:", "WARNING: BOM!" if f.read(3) == b'\xef\xbb\xbf' else "OK (no BOM)")
