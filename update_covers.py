#!/usr/bin/env python3
"""
Replace OpenLibrary / Google Books covers with high-res Amazon covers
scraped directly from each product page. All images are 1000-1500px
wide, consistent quality with own-book Shopify covers.
"""
import json, os

os.chdir("C:/Users/aukeh/skriuwer-site")

COVERS = {
    "the-leadership-challenge":                                         "https://m.media-amazon.com/images/I/81BuF6SYKML._SL1500_.jpg",
    "homo-deus-harari":                                                 "https://m.media-amazon.com/images/I/71NwNj+vUcL._SL1500_.jpg",
    "the-warmth-of-other-suns-wilkerson":                               "https://m.media-amazon.com/images/I/815AgUmtUgL._SL1500_.jpg",
    "rubicon-holland":                                                  "https://m.media-amazon.com/images/I/71oZqgP6pPL._SL1198_.jpg",
    "caesar-goldsworthy":                                               "https://m.media-amazon.com/images/I/71VIW8GJzbL._SL1500_.jpg",
    "the-encyclopedia-of-mythology-cotterell":                          "https://m.media-amazon.com/images/I/51-9FALBZTL._SL1500_.jpg",
    "heroes-author":                                                    "https://m.media-amazon.com/images/I/91KDK80jIbL._SL1500_.jpg",
    "the-song-of-achilles-miller":                                      "https://m.media-amazon.com/images/I/81ezlk3t-hL._SL1500_.jpg",
    "egyptian-gods-weaver":                                             "https://m.media-amazon.com/images/I/81PXS3EsdBL._SL1360_.jpg",
    "gods-and-myths-of-ancient-egypt-armour":                           "https://m.media-amazon.com/images/I/918pZY3-nHL._SL1500_.jpg",
    "the-rape-of-nanking-chang":                                        "https://m.media-amazon.com/images/I/71XBvoDdfSL._SL1500_.jpg",
    "hitlers-willing-executioners-goldhagen":                           "https://m.media-amazon.com/images/I/71xAeYTCaEL._SL1183_.jpg",
    "the-case-for-christ-strobel":                                      "https://m.media-amazon.com/images/I/91VihBRpSPL._SL1500_.jpg",
    "why-we-sleep-walker":                                              "https://m.media-amazon.com/images/I/814sf-LvR0L._SL1500_.jpg",
    "how-to-learn-any-language-farber":                                 "https://m.media-amazon.com/images/I/71G+kAs-2sL._SL1360_.jpg",
    "through-the-language-glass-deutscher":                             "https://m.media-amazon.com/images/I/71cslaX-yYL._SL1279_.jpg",
    "mindset-dweck":                                                    "https://m.media-amazon.com/images/I/71h937MExWL._SL1500_.jpg",
    "the-power-of-now-tolle":                                           "https://m.media-amazon.com/images/I/61Ij8nLooNL._SL1500_.jpg",
    "leonardo-da-vinci-isaacson":                                       "https://m.media-amazon.com/images/I/91Ey0+6N-LL._SL1500_.jpg",
    "the-wright-brothers-mccullough":                                   "https://m.media-amazon.com/images/I/71TYHByzngL._SL1500_.jpg",
    "meditations-aurelius":                                             "https://m.media-amazon.com/images/I/81d2ukKVuiL._SL1500_.jpg",
    "the-body-keeps-the-score-kolk":                                    "https://m.media-amazon.com/images/I/51f-lu5FgtL._SL1200_.jpg",
    "the-hiding-place-boom":                                            "https://m.media-amazon.com/images/I/61Pvc2n4cJL._SL1500_.jpg",
    "how-to-win-friends-and-influence-people-carnegie":                 "https://m.media-amazon.com/images/I/71kvhQyf7fL._SL1500_.jpg",
    "astrophysics-for-people-in-a-hurry-tyson":                         "https://m.media-amazon.com/images/I/914EiU2QImL._SL1500_.jpg",
    "the-gene-mukherjee":                                               "https://m.media-amazon.com/images/I/71ZGYmVZKXL._SL1500_.jpg",
    "influence-cialdini":                                               "https://m.media-amazon.com/images/I/71SPjJ+UnLL._SL1500_.jpg",
    "edith-hamiltons-mythology-hamilton":                               "https://m.media-amazon.com/images/I/71rzzuGUWNL._SL1500_.jpg",
    "behold-a-pale-horse-cooper":                                       "https://m.media-amazon.com/images/I/814Op7Z-nCL._SL1500_.jpg",
    "how-rome-fell-goldsworthy":                                        "https://m.media-amazon.com/images/I/61Q8mXeUmWL._SL1000_.jpg",
    "egyptian-mythology-pinch":                                         "https://m.media-amazon.com/images/I/81WbIkvTZXL._SL1500_.jpg",
    "sapiens-a-brief-history-of-humankind-harari":                      "https://m.media-amazon.com/images/I/716E6dQ4BXL._SL1500_.jpg",
    "atomic-habits-an-easy-proven-way-to-build-good-habits-break-bad-ones-clear": "https://m.media-amazon.com/images/I/81kg51XRc1L._SL1500_.jpg",
    "guns-germs-and-steel-the-fates-of-human-societies-diamond":        "https://m.media-amazon.com/images/I/61V8g4GgqdL._SL1200_.jpg",
    "a-brief-history-of-time-hawking":                                  "https://m.media-amazon.com/images/I/91ebghaV-eL._SL1500_.jpg",
    "the-7-habits-of-highly-effective-people-powerful-lessons-in-personal-change-cove": "https://m.media-amazon.com/images/I/71rmHeQeuRL._SL1255_.jpg",
    "extreme-ownership-how-u-s-navy-seals-lead-and-win-babin":          "https://m.media-amazon.com/images/I/71teGAqCOzL._SL1500_.jpg",
    "deep-work-rules-for-focused-success-in-a-distracted-world-newport": "https://m.media-amazon.com/images/I/71wSsgrOIhL._SL1500_.jpg",
    "the-daily-stoic-366-meditations-on-wisdom-perseverance-and-the-art-of-living-han": "https://m.media-amazon.com/images/I/715WT6IGgLL._SL1500_.jpg",
    "mans-search-for-meaning-frankl":                                   "https://m.media-amazon.com/images/I/81UhnGT7BvL._SL1500_.jpg",
    "educated-a-memoir-westover":                                       "https://m.media-amazon.com/images/I/71-4MkLN5jL._SL1500_.jpg",
    "wild-from-lost-to-found-on-the-pacific-crest-trail-strayed":       "https://m.media-amazon.com/images/I/71M6e86LzpL._SL1500_.jpg",
    "mindhunter-inside-the-fbis-elite-serial-crime-unit-olshaker":      "https://m.media-amazon.com/images/I/81+w9N7ICgL._SL1500_.jpg",
    "helter-skelter-the-true-story-of-the-manson-murders-gentry":       "https://m.media-amazon.com/images/I/51atngIHkvL._SL1202_.jpg",
    "the-hero-with-a-thousand-faces-campbell":                          "https://m.media-amazon.com/images/I/81v9zbNbzZL._SL1500_.jpg",
    "the-iliad-fagles":                                                 "https://m.media-amazon.com/images/I/71FVVdj9w4L._SL1500_.jpg",
    "the-creature-from-jekyll-island-a-second-look-at-the-federal-reserve-griffin":   "https://m.media-amazon.com/images/I/61h+4C3+X8L._SL1500_.jpg",
    "the-language-instinct-how-the-mind-creates-language-pinker":       "https://m.media-amazon.com/images/I/91Nv677SKDL._SL1500_.jpg",
    "fluent-forever-how-to-learn-any-language-fast-and-never-forget-it-wyner":        "https://m.media-amazon.com/images/I/611gisKfUpL._SL1200_.jpg",
    "the-myth-of-sisyphus-camus":                                       "https://m.media-amazon.com/images/I/61-M36Jrb0L._SL1500_.jpg",
}

print(f"Loaded {len(COVERS)} cover URLs to apply\n")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

updated = 0
missing = []

for book in data["books"]:
    slug = book.get("slug", "")
    if slug in COVERS:
        old = book.get("coverImage", "")
        new_cover = COVERS[slug]
        # Keep the old cover (OL or Google Books) as the fallback in case Amazon CDN blocks
        book["coverImageFallback"] = old if old.startswith("http") else book.get("coverImageFallback", "")
        book["coverImage"]         = new_cover
        updated += 1

# Sanity-check: every third-party visible book should now have an Amazon cover
with open("data/deleted_slugs.json", "r", encoding="utf-8") as f:
    deleted = set(json.load(f))
for book in data["books"]:
    if (not book.get("isOwnBook")) and book["slug"] not in deleted:
        if "m.media-amazon.com" not in book.get("coverImage", ""):
            missing.append(book["slug"])

print(f"Covers updated: {updated}")
print(f"Visible third-party books still missing Amazon cover: {len(missing)}")
for s in missing:
    print(f"  - {s}")

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

with open("data/books.json", "r", encoding="utf-8") as f:
    v = json.load(f)
print(f"\nVerified: {len(v['books'])} books")
with open("data/books.json", "rb") as f:
    print("BOM:", "WARNING" if f.read(3) == b'\xef\xbb\xbf' else "OK (no BOM)")
