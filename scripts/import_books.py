"""
One-time import: converts Shopify products.json + master_products.json + hooks.json
into data/books.json for the Skriuwer affiliate site.

Usage: python scripts/import_books.py
"""

import json
import re
import os

SOURCE_DIR = r"C:\Users\aukeh\Downloads\skriuwer_pinterest"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")

CATEGORY_RULES = [
    ("mythology", ["mythology", "myth", "legends", "gods", "norse", "greek"]),
    ("dark-history", ["scary", "dark", "horror", "brutal", "gruesome"]),
    ("language-learning", ["bilingual", "stories", "vocabulary", "kurzgeschichten", "zweisprachige", "short stories"]),
    ("frisian", ["frisian", "frysk", "west frisian", "friesland"]),
    ("history", ["history", "historical", "ancient", "civilization", "war", "empire"]),
    ("conspiracy", ["conspiracy", "hidden", "secret", "cover-up", "controversial"]),
    ("religion", ["bible", "religion", "spiritual", "church", "faith"]),
    ("science", ["science", "nature", "technology", "physics", "biology", "dinosaur"]),
    ("self-help", ["self-help", "motivation", "mindset", "productivity"]),
    ("fiction", ["fiction", "novel", "story", "thriller", "romance"]),
]


def classify_book(title, tags, description):
    text = f"{title} {' '.join(tags)} {description}".lower()
    matched = []
    for slug, keywords in CATEGORY_RULES:
        if any(kw in text for kw in keywords):
            matched.append(slug)
    return matched if matched else ["general"]


def detect_language(tags, title):
    tag_str = " ".join(tags).lower()
    title_lower = title.lower()
    if "german" in tag_str or "in german" in tag_str or "auf deutsch" in title_lower:
        return "de"
    if "dutch" in tag_str:
        return "nl"
    if "french" in tag_str:
        return "fr"
    return "en"


def extract_asin(url):
    if not url:
        return None
    match = re.search(r"/dp/([A-Z0-9]+)", url)
    return match.group(1) if match else None


def build_marketplaces(asin):
    return {
        "amazon.com": f"https://www.amazon.com/dp/{asin}",
        "amazon.de": f"https://www.amazon.de/dp/{asin}",
        "amazon.co.uk": f"https://www.amazon.co.uk/dp/{asin}",
        "amazon.nl": f"https://www.amazon.nl/dp/{asin}",
    }


def main():
    # Load source data
    with open(os.path.join(SOURCE_DIR, "products.json"), "r", encoding="utf-8") as f:
        shopify_data = json.load(f)
    shopify_products = shopify_data.get("products", shopify_data) if isinstance(shopify_data, dict) else shopify_data

    with open(os.path.join(SOURCE_DIR, "master_products.json"), "r", encoding="utf-8") as f:
        master_data = json.load(f)
    master_products = master_data.get("products", master_data) if isinstance(master_data, dict) else master_data

    with open(os.path.join(SOURCE_DIR, "hooks.json"), "r", encoding="utf-8") as f:
        hooks = json.load(f)

    print(f"Loaded: {len(shopify_products)} Shopify products")
    print(f"Loaded: {len(master_products)} master products")
    print(f"Loaded: {len(hooks)} hooks")

    output_books = []
    seen_slugs = set()
    seen_asins = set()

    # 1. Process Shopify products (own books)
    skipped_no_asin = []
    for i, prod in enumerate(shopify_products):
        asin = prod.get("amazon_asin") or extract_asin(prod.get("amazon_url", ""))
        slug = prod["handle"]

        # REQUIRED: skip books with no Amazon ASIN — they can't be bought via affiliate links
        if not asin:
            skipped_no_asin.append(prod["title"])
            continue

        if slug in seen_slugs:
            continue
        seen_slugs.add(slug)
        seen_asins.add(asin)

        hook_data = hooks.get(str(i), {})
        categories = classify_book(prod["title"], prod.get("tags", []), prod.get("body_html", ""))
        language = detect_language(prod.get("tags", []), prod["title"])

        cover = prod.get("images", [{}])[0].get("src", "") if prod.get("images") else ""

        output_books.append({
            "slug": slug,
            "asin": asin,
            "title": prod["title"],
            "description": prod.get("body_html", ""),
            "author": prod.get("vendor", "Skriuwer.com"),
            "coverImage": cover,
            "coverImageFallback": f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.L.jpg" if asin else None,
            "categories": categories,
            "tags": prod.get("tags", []),
            "language": language,
            "pages": None,
            "price": prod.get("variants", [{}])[0].get("price") if prod.get("variants") else None,
            "currency": "USD",
            "reviewCount": prod.get("review_count", 0) or 0,
            "starRating": prod.get("star_rating"),
            "marketplaces": build_marketplaces(asin) if asin else {},
            "isOwnBook": True,
            "hookText": hook_data.get("hook"),
            "publishedDate": None,
        })

    if skipped_no_asin:
        print(f"\nSkipped {len(skipped_no_asin)} Shopify products with no ASIN (no Amazon link):")
        for t in skipped_no_asin:
            print(f"  [NO ASIN] {t[:80]}")

    # 2. Process master products (add review data to existing, add new ones)
    for i, prod in enumerate(master_products):
        asin = prod["asin"]
        slug = prod["handle"]

        # If we already have this book (by ASIN), just update review data
        if asin in seen_asins:
            for book in output_books:
                if book["asin"] == asin:
                    book["reviewCount"] = max(book["reviewCount"], prod.get("review_count", 0))
                    book["starRating"] = prod.get("star_rating") or book["starRating"]
                    break
            continue

        if slug in seen_slugs:
            continue
        seen_slugs.add(slug)
        seen_asins.add(asin)

        hook_data = hooks.get(str(i), {})
        categories = classify_book(prod["title"], prod.get("tags", []), "")

        cover = prod.get("images", [{}])[0].get("src", "") if prod.get("images") else ""

        output_books.append({
            "slug": slug,
            "asin": asin,
            "title": prod["title"],
            "description": "",
            "author": "Skriuwer.com",
            "coverImage": cover,
            "coverImageFallback": f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.L.jpg",
            "categories": categories,
            "tags": prod.get("tags", []),
            "language": "en",
            "pages": None,
            "price": prod.get("variants", [{}])[0].get("price") if prod.get("variants") else None,
            "currency": "USD",
            "reviewCount": prod.get("review_count", 0),
            "starRating": prod.get("star_rating"),
            "marketplaces": build_marketplaces(asin),
            "isOwnBook": prod.get("shopify_id") is not None,
            "hookText": hook_data.get("hook"),
            "publishedDate": None,
        })

    # Final safety filter: never write a book without an ASIN (no affiliate link = no revenue)
    output_books = [b for b in output_books if b.get("asin")]

    # Keep Shopify products in their original order (first 144),
    # then append Amazon-only books sorted by review count
    shopify_books = [b for b in output_books if b["isOwnBook"]]
    amazon_books = [b for b in output_books if not b["isOwnBook"]]
    amazon_books.sort(key=lambda b: b["reviewCount"], reverse=True)
    output_books = shopify_books + amazon_books

    # Write output
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    output_path = os.path.join(OUTPUT_DIR, "books.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({"books": output_books}, f, indent=2, ensure_ascii=False)

    own = sum(1 for b in output_books if b["isOwnBook"])
    reviewed = sum(1 for b in output_books if b["reviewCount"] > 0)
    print(f"\nOutput: {len(output_books)} books -> {output_path}")
    print(f"  Own books: {own}")
    print(f"  Other books: {len(output_books) - own}")
    print(f"  With reviews: {reviewed}")


if __name__ == "__main__":
    main()
