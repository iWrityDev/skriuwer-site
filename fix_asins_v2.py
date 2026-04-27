#!/usr/bin/env python3
"""
Fix 4 wrong-book ASINs (pages loaded live but pointed to wrong book)
+ 1 edition upgrade (library binding -> regular paperback).
"""
import json, os

os.chdir("C:/Users/aukeh/skriuwer-site")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# slug -> (old_asin, new_asin, reason)
FIXES = {
    "wild-from-lost-to-found-on-the-pacific-crest-trail-strayed":
        ("1400033438", "0307476073", "wrong book (showed 'Sula: A Novel')"),
    "mindhunter-inside-the-fbis-elite-serial-crime-unit-olshaker":
        ("1501138979", "1501191969", "wrong book (showed 'The Antiques: A Novel')"),
    "helter-skelter-the-true-story-of-the-manson-murders-gentry":
        ("0393322807", "0393322238", "wrong book (showed 'Reflections in Black')"),
    "edith-hamiltons-mythology-hamilton":
        ("1586633805", "0446574759", "pointed to SparkNotes study guide, not the actual book"),
    "the-rape-of-nanking-chang":
        ("0613180771", "0465068367", "upgrade from library-only binding to Basic Books paperback"),
}

TAG = "31813-20"

def mp(domain, asin):
    return f"https://www.{domain}/dp/{asin}?tag={TAG}"

def cdn(asin):
    return f"https://m.media-amazon.com/images/P/{asin}.01._SX1000_.jpg"

fixed = 0
for book in data["books"]:
    slug = book.get("slug", "")
    if slug not in FIXES:
        continue
    old, new, reason = FIXES[slug]
    assert book.get("asin") == old, f"{slug}: expected {old}, got {book.get('asin')}"
    print(f"  FIX: {old} -> {new}  | {book['title'][:40]}")
    print(f"        reason: {reason}")
    book["asin"] = new
    book["marketplaces"] = {
        "amazon_us": mp("amazon.com",   new),
        "amazon_uk": mp("amazon.co.uk", new),
        "amazon_de": mp("amazon.de",    new),
        "amazon_nl": mp("amazon.nl",    new),
    }
    fb = book.get("coverImageFallback", "")
    if "m.media-amazon.com" in fb or "images-na.ssl-images-amazon.com" in fb:
        book["coverImageFallback"] = cdn(new)
    fixed += 1

print(f"\n{fixed} ASIN(s) fixed.")

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

with open("data/books.json", "rb") as f:
    print("BOM:", "WARNING" if f.read(3) == b'\xef\xbb\xbf' else "OK (no BOM)")

with open("data/books.json", "r", encoding="utf-8") as f:
    v = json.load(f)
print(f"Verified: {len(v['books'])} books total")
