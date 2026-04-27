#!/usr/bin/env python3
"""
Fix 60 own-book ASINs that pointed to completely wrong books on Amazon.

Root cause: the ISBN-10 ASINs for own-published Skriuwer books were
fabricated (e.g., 'The History of Israel' → 'Catechism of the Catholic
Church'). The correct Skriuwer book ASINs were found by (1) scraping
the Skriuwer author catalog on Amazon, and (2) doing targeted
'{title} Skriuwer' searches for anything that didn't match the catalog.
All 60 new ASINs were verified by fetching the Amazon /dp/{asin} page
and confirming the product title matches the book title.
"""
import json, os

os.chdir("C:/Users/aukeh/skriuwer-site")

# slug -> new ASIN (verified)
FIXES = {
    # High-confidence catalog matches
    "the-50-craziest-conspiracies":                                     "B0DYPCM8P9",
    "the-history-of-the-usa-understanding-americas-past":               "B0D6BWYY5C",
    "greek-mythology-book-for-adults":                                  "B0F2NB9KR4",
    "american-civil-war-history":                                       "B0GMHMHRVZ",
    "the-history-of-japan-a-journey-through-time":                      "B0D83J2K85",
    "the-hidden-history-of-america-forgotten-betrayals-revealed":       "B0FXH5SZKD",
    "scary-american-history-facts":                                     "B0DSW6QPGJ",
    "the-dark-greek-mythology-book-ancient-horror-myths-the-brutal-truth-behind-legends": "B0GDDRN3TH",
    "the-history-of-the-vikings":                                       "B0DRCPWMXS",
    "the-dark-history-of-the-bible-untold-scandals":                    "B0GDGTLZ5G",
    "the-dark-side-of-the-talmud":                                      "B0FR37KC24",
    "the-dinosaur-conspiracies-the-great-dino-hoax":                    "B0G5N1LMD7",
    "the-history-of-israel":                                            "B0D9YVWZ27",
    "the-history-of-egypt":                                             "B0DVR5V1YB",
    "greek-mythology-book-for-teens":                                   "B0F37JN593",
    "a-book-on-how-to-win-at-travel":                                   "B0F3X367HT",
    "the-history-of-ancient-rome":                                      "B0DYWBNPXY",
    "the-craziest-nazi-conspiracies":                                   "B0DRD14KHC",
    "the-titanic-conspiracy":                                           "B0FQJTLGCS",
    "the-history-of-christianity":                                      "B0F1LMGWLG",
    "the-hidden-history-of-germany-forbidden-facts-and-hushed-up-truths": "3565221011",  # was already right
    "the-vegan-deception-exposing-plant-based-health-risks":            "B0FXF1QDZ8",
    "the-history-of-croatia":                                           "B0DYZV5JVM",
    "adolf-hitlers-untold-story-first-person-chronicle":                "B0FVT2T6Q5",
    "the-history-of-denmark":                                           "B0DWXHW2ZN",
    "the-history-of-new-zealand-land-conflict-and-the-search-for-unity": "B0DW4717BP",
    "norse-mythology-book-for-teens":                                   "B0F3VP8N3Y",
    "the-history-of-spain-conquests-cultures-revolutions":              "B0DVT66V9S",
    "the-history-of-the-netherlands":                                   "B0DYF2DXK4",
    "learn-it-yourself-frisian-learnfrisian-lear-it-dysels":            "B09NRH6W2Q",
    "the-history-of-finland":                                           "B0DRD7DRVW",
    "the-history-of-norway-vikings-unions-independence-paperback-book": "B0DYJN64SN",
    "the-history-of-south-korea":                                       "B0F2ND2F96",
    "the-history-of-paris":                                             "B0DY1KCBWZ",
    "the-history-of-gold":                                              "B0DX2MCZDX",
    "the-history-of-burger-king-insta-whopper-revolution":              "B0FXGYVYKN",
    "the-history-of-youtube":                                           "B0DWN2XKBX",
    "how-to-pray-for-healing-a-guide-to-everyday-healing-prayer":       "B0FJXDKPST",
    "the-history-of-greenland":                                         "B0F3NZK78Z",
    "the-history-of-google":                                            "B0F241VL5Z",
    "understanding-frisian":                                            "B09NRH6W2Q",
    "frisian-wordbook-frysk-wurdboek-a-frisian-dictionary":             "B0BSWC99TQ",

    # Found via targeted {title} + Skriuwer searches
    "the-history-of-germany":                                           "3565084235",
    "leer-het-jezelf-fries":                                            "9403667885",
    "why-is-mass-immigration-really-happening-paperback-book":          "B0FWX4PNS9",
    "the-vietnam-war-through-vietnamese-eyes":                          "B0GJG9635H",
    "the-forbidden-science-race-biology-genetics-and-iq-realities":     "B0FX1WX4T8",
    "the-unknown-world-war-2-battles-book":                             "B0F2J89653",
    "scary-ancient-civilizations-history-facts-secrets-sacrifice-and-doom": "B0DTQ7Q1M6",
    "the-history-of-vietnam":                                           "B0FM8LQFX4",
    "the-history-of-indonesia-tracing-an-archipelagic-legacy":          "B0DYVP6FTJ",
    "the-history-of-philosophy":                                        "B0DWXXG85N",
    "zweisprachige-kurzgeschichten-deutsch-niederlandisch-75-geschichten": "B0G3GTKSSK",
    "die-dunkle-griechische-mythologie-alte-horrormythen-die-brutale-wahrheit-hinter-den-legenden": "B0GN8L6WMJ",
    "700-frisian-phrases-fryske-utspraken-for-everyday-use":            "B09NRDSR1V",
    "zweisprachige-kurzgeschichten-auf-deutsch-und-portugiesisch-75-magische-geschichten-zum-portugiesischlernen-fur-deutsche-mit-vokabelubungen-und-einfachen-wortern-fur-anfanger": "B0GH85QD2V",
    "the-history-of-scotland-book-from-ancient-times-to-modern-days-paperback-book": "3565083204",
    "the-history-of-the-book":                                          "3565084111",
    "the-history-of-the-uk":                                            "3565084197",
    "the-ultimate-frisian-verb-handbook-450-essential-verbs":           "B0C9SDM5R5",

    # asin-1490353003 (Yeshu) keeps its existing ASIN — already correct
}

TAG = "31813-20"

def mp(domain, asin):
    return f"https://www.{domain}/dp/{asin}?tag={TAG}"

def cdn(asin):
    # Amazon /images/P/ CDN (works for books; returns 1×1 placeholder for ISBNs
    # but that's OK — we keep the Shopify CDN as the primary coverImage for own books)
    return f"https://m.media-amazon.com/images/P/{asin}.01._SX1000_.jpg"

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

fixed = 0
skipped = 0
for book in data["books"]:
    slug = book.get("slug", "")
    if slug not in FIXES:
        continue
    new_asin = FIXES[slug]
    old_asin = book.get("asin", "")
    if old_asin == new_asin:
        skipped += 1
        continue
    print(f"  {old_asin:12s} -> {new_asin:12s}  | {book['title'][:48]}")
    book["asin"] = new_asin
    book["marketplaces"] = {
        "amazon_us": mp("amazon.com",   new_asin),
        "amazon_uk": mp("amazon.co.uk", new_asin),
        "amazon_de": mp("amazon.de",    new_asin),
        "amazon_nl": mp("amazon.nl",    new_asin),
    }
    # Update coverImageFallback (Amazon CDN URL with new ASIN)
    fb = book.get("coverImageFallback", "")
    if "m.media-amazon.com" in fb or "images-na.ssl-images-amazon.com" in fb:
        book["coverImageFallback"] = cdn(new_asin)
    fixed += 1

print(f"\n{fixed} ASINs fixed, {skipped} unchanged (already correct)")

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

with open("data/books.json", "rb") as f:
    print("BOM:", "WARNING" if f.read(3) == b'\xef\xbb\xbf' else "OK (no BOM)")
with open("data/books.json", "r", encoding="utf-8") as f:
    v = json.load(f)
print(f"Verified: {len(v['books'])} books total")
