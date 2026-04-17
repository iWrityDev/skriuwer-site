"""
import_google_books.py - Discover books from Google Books API and NYT Bestsellers,
then append them to data/books.json as Amazon affiliate products.

Usage:
    python scripts/import_google_books.py
    python scripts/import_google_books.py --dry-run
    python scripts/import_google_books.py --nyt-only

Requires:
    pip install requests

Environment variables (or set in scripts/secrets.env):
    GOOGLE_BOOKS_API_KEY  - optional, raises rate limit
    NYT_BOOKS_API_KEY     - optional, for NYT bestseller lists
"""

import os
import re
import sys
import json
import time
import argparse

import requests

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BOOKS_JSON_PATH = os.path.join(SCRIPT_DIR, "..", "data", "books.json")
AFFILIATE_TAG = "31813-20"
GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"
NYT_BOOKS_API = "https://api.nytimes.com/svc/books/v3/lists/current/{list}.json"

NYT_LISTS = [
    "hardcover-fiction",
    "hardcover-nonfiction",
    "paperback-trade-fiction",
    "advice-how-to-and-miscellaneous",
    "business-books",
    "science",
    "combined-print-and-e-book-fiction",
    "combined-print-and-e-book-nonfiction",
    "young-adult-hardcover",
]

NYT_LIST_CATEGORY_MAP = {
    "hardcover-fiction": ["fiction"],
    "paperback-trade-fiction": ["fiction"],
    "combined-print-and-e-book-fiction": ["fiction"],
    "young-adult-hardcover": ["fiction"],
    "hardcover-nonfiction": ["history"],
    "combined-print-and-e-book-nonfiction": ["history"],
    "business-books": ["business"],
    "science": ["science"],
    "advice-how-to-and-miscellaneous": ["self-help"],
}

# ---------------------------------------------------------------------------
# Query lists
# ---------------------------------------------------------------------------

EN_QUERIES = [
    # History & Ancient
    "best greek mythology books",
    "best roman history books",
    "best ancient history books",
    "best mythology books bestseller",
    "best viking history books",
    "best medieval history books",
    "best ancient egypt books",
    "best world history books bestseller",
    "best ancient civilizations books",
    "best dark history books",
    "best military history books",
    # Language Learning
    "best language learning books",
    "bilingual books language learning",
    "best frisian language books",
    "best latin learning books",
    "best dutch language books",
    "best german language learning books",
    "best linguistics books",
    "learn new language books bestseller",
    # Self-Help & Psychology
    "bestselling self-help books",
    "best psychology books",
    "best mindset books",
    "best habits books atomic habits productivity",
    "best stoicism books",
    "best philosophy books bestseller",
    "best motivation books",
    "best mental health books",
    # Business & Finance
    "best business books bestseller",
    "best investing books",
    "best entrepreneurship books",
    "best personal finance books",
    "best leadership books",
    "best startup books",
    # True Crime & Dark
    "best true crime books",
    "best serial killer books",
    "best crime thriller books",
    "best conspiracy books",
    # Biography
    "best biography books",
    "best memoir books bestseller",
    "best autobiography books",
    "best presidential biography books",
    # Science & Nature
    "best popular science books",
    "best physics books for general readers",
    "best nature books",
    "best astronomy books",
    "best biology books",
    # Fiction
    "best literary fiction books",
    "best historical fiction books",
    "best thriller novels bestseller",
    "best fantasy books",
    "best science fiction books",
    # Religion & Spirituality
    "best religion books",
    "best spiritual books",
    "best bible study books",
    # General Bestsellers
    "new york times bestseller books",
    "most popular books all time",
    "best books of all time classic",
    # More specific history
    "best world war 2 books",
    "best ancient rome books",
    "best ancient greece books",
    "best medieval europe books",
    "best napoleonic wars books",
    "best american civil war books",
    "best cold war history books",
    "best colonial history books",
    "best roman empire books",
    # More specific psychology / self-help
    "cognitive behavioral therapy books",
    "emotional intelligence books bestseller",
    "best anxiety books",
    "best trauma healing books",
    "best happiness books science",
    "best decision making books",
    "best negotiation books",
    "neuroscience brain books popular",
    # More business
    "best management books",
    "best marketing books bestseller",
    "best sales books",
    "best wealth building books",
    "best real estate investing books",
    "best cryptocurrency books",
    # More biography
    "best military biography books",
    "best scientist biography books",
    "best artist biography books",
    "best CEO business biography books",
    # More true crime
    "best detective books true story",
    "best heist books true crime",
    "best cult books true crime",
    "best organized crime books",
    # More fiction genres
    "best mystery novels bestseller",
    "best horror novels bestseller",
    "best dystopian fiction books",
    "best romance novels bestseller",
    "best graphic novels adults",
    # More science
    "best climate change books",
    "best evolution biology books",
    "best neuroscience books popular",
    "best mathematics books popular",
    "best engineering books popular",
    # Frisian and Dutch culture
    "frisian culture history books",
    "netherlands dutch history books",
    "north sea germanic history books",
    # More biography targeting
    "biography Nelson Mandela",
    "biography Winston Churchill books",
    "biography Steve Jobs biography Walter Isaacson",
    "biography Abraham Lincoln Doris Kearns Goodwin",
    "biography Einstein biography books",
    "biography Napoleon biography books",
    "biography Marie Curie biography",
    "biography Genghis Khan biography",
    "biography Nikola Tesla biography",
    "biography Cleopatra biography",
    "memoir bestseller nonfiction",
    "life story biography historical figure",
    # More true crime targeting
    "true crime serial killer book bestseller",
    "true crime murder mystery nonfiction",
    "true crime cold case investigation",
    "forensic crime investigation book",
    "FBI crime investigation book",
    "mafia organized crime nonfiction book",
    "true crime podcast book",
    # More philosophy
    "philosophy stoicism Marcus Aurelius",
    "philosophy Nietzsche introduction",
    "philosophy Plato introduction",
    "philosophical classics paperback",
    "ethics moral philosophy book",
]

DE_QUERIES = [
    "Griechische Mythologie Buecher",
    "Roemische Geschichte Buecher",
    "Friesisch lernen Buecher",
    "beste Sachbuecher",
    "Psychologie Buecher Bestseller",
    "Geschichte Buecher Bestseller",
    "Zweisprachige Buecher Deutsch lernen",
]

# ---------------------------------------------------------------------------
# Query-to-category override: force specific categories based on query keywords.
# If the query contains any key substring, the book's categories are REPLACED
# with the override value. This fixes Google Books mislabelling (e.g., true crime
# books showing up as "Biography").
# ---------------------------------------------------------------------------

QUERY_CATEGORY_OVERRIDES: list[tuple[str, list[str]]] = [
    # True crime — highest priority (very often mislabelled)
    ("true crime", ["true-crime"]),
    ("serial killer", ["true-crime"]),
    ("cold case", ["true-crime"]),
    ("forensic crime", ["true-crime"]),
    ("fbi crime", ["true-crime"]),
    ("mafia organized crime", ["true-crime"]),
    ("heist books true crime", ["true-crime"]),
    ("cult books true crime", ["true-crime"]),
    ("organized crime", ["true-crime"]),
    ("detective books true story", ["true-crime"]),
    ("murder mystery nonfiction", ["true-crime"]),
    # Psychology — often labelled "self-help" by Google
    ("best psychology books", ["psychology"]),
    ("cognitive behavioral therapy", ["psychology", "self-help"]),
    ("emotional intelligence", ["psychology", "self-help"]),
    ("neuroscience brain books", ["psychology", "science"]),
    ("narcissism", ["psychology"]),
    ("trauma healing", ["psychology", "self-help"]),
    ("anxiety books", ["psychology", "self-help"]),
    ("happiness books science", ["psychology", "self-help"]),
    # Philosophy — often gets no category from Google
    ("philosophy stoicism", ["philosophy"]),
    ("philosophy nietzsche", ["philosophy"]),
    ("philosophy plato", ["philosophy"]),
    ("philosophical classics", ["philosophy"]),
    ("ethics moral philosophy", ["philosophy"]),
    ("stoicism marcus aurelius", ["philosophy"]),
    # Biography — ensure correct category
    ("biography nelson mandela", ["biography"]),
    ("biography winston churchill", ["biography"]),
    ("biography steve jobs", ["biography"]),
    ("biography abraham lincoln", ["biography"]),
    ("biography einstein", ["biography"]),
    ("biography napoleon", ["biography"]),
    ("biography marie curie", ["biography"]),
    ("biography genghis khan", ["biography"]),
    ("biography nikola tesla", ["biography"]),
    ("biography cleopatra", ["biography"]),
    ("military biography", ["biography", "history"]),
    # Mythology — ensure correct category
    ("best greek mythology", ["mythology"]),
    ("best norse mythology", ["mythology"]),
    ("best egyptian mythology", ["mythology"]),
    ("best roman mythology", ["mythology"]),
    # Dark history
    ("dark history books", ["dark-history", "history"]),
    ("conspiracy books", ["conspiracy"]),
]


def apply_query_category_override(book: dict, query: str) -> dict:
    """Override book categories based on query keywords if a match is found."""
    query_lower = query.lower()
    for keyword, forced_cats in QUERY_CATEGORY_OVERRIDES:
        if keyword in query_lower:
            book = dict(book)
            book["categories"] = forced_cats
            return book
    return book

# ---------------------------------------------------------------------------
# Category map
# ---------------------------------------------------------------------------

CATEGORY_MAP = {
    "history": "history",
    "ancient": "history",
    "medieval": "history",
    "military": "history",
    "war": "history",
    "mythology": "mythology",
    "myth": "mythology",
    "legend": "mythology",
    "religion": "religion",
    "spiritual": "religion",
    "bible": "religion",
    "christianity": "religion",
    "islam": "religion",
    "buddhism": "religion",
    "language": "language-learning",
    "foreign language": "language-learning",
    "linguistics": "language-learning",
    "self-help": "self-help",
    "personal development": "self-help",
    "motivation": "self-help",
    "productivity": "self-help",
    "psychology": "psychology",
    "mind": "psychology",
    "cognitive": "psychology",
    "mental health": "psychology",
    "behavior": "psychology",
    "behaviour": "psychology",
    "business": "business",
    "finance": "business",
    "economics": "business",
    "investing": "business",
    "biography": "biography",
    "memoir": "biography",
    "autobiography": "biography",
    "true crime": "true-crime",
    "crime": "true-crime",
    "fiction": "fiction",
    "novel": "fiction",
    "thriller": "fiction",
    "fantasy": "fiction",
    "science fiction": "fiction",
    "science": "science",
    "nature": "science",
    "technology": "science",
    "philosophy": "philosophy",
    "stoicism": "philosophy",
    "ethics": "philosophy",
}

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------


def slugify(text, max_len=80):
    """Lowercase, remove apostrophes, replace non-alphanumeric with hyphens, truncate."""
    text = text.lower()
    text = text.replace("'", "").replace("\u2019", "")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = text.strip("-")
    return text[:max_len].rstrip("-")


def isbn13_to_isbn10(isbn13):
    """Convert ISBN-13 to ISBN-10. Returns None if conversion is not possible."""
    digits = re.sub(r"\D", "", isbn13)
    if len(digits) != 13:
        return None
    if not digits.startswith("978") and not digits.startswith("979"):
        return None
    core = digits[3:12]
    total = 0
    for i, d in enumerate(core):
        total += (10 - i) * int(d)
    check = (11 - (total % 11)) % 11
    check_char = "X" if check == 10 else str(check)
    return core + check_char


def get_asin(industry_identifiers):
    """Extract ASIN from industry identifiers. Prefer ISBN_10, fall back to ISBN_13 conversion."""
    if not industry_identifiers:
        return None
    isbn10 = None
    isbn13 = None
    for item in industry_identifiers:
        id_type = item.get("type", "")
        identifier = item.get("identifier", "")
        if id_type == "ISBN_10" and identifier:
            isbn10 = identifier
        elif id_type == "ISBN_13" and identifier:
            isbn13 = identifier
    if isbn10:
        return isbn10
    if isbn13:
        return isbn13_to_isbn10(isbn13)
    return None


def map_categories(google_categories):
    """Map Google Books categories to site categories."""
    if not google_categories:
        return ["history"]
    combined = " ".join(google_categories).lower()
    matched = []
    seen = set()
    for key, site_cat in CATEGORY_MAP.items():
        if key in combined and site_cat not in seen:
            matched.append(site_cat)
            seen.add(site_cat)
    return matched if matched else ["history"]


def build_amazon_url(asin):
    """Build Amazon affiliate URL for a given ASIN."""
    return f"https://www.amazon.com/dp/{asin}?tag={AFFILIATE_TAG}"


def build_cover_image(volume_info):
    """Extract best available cover image URL from volume info."""
    image_links = volume_info.get("imageLinks", {})
    for key in ("extraLarge", "large", "medium", "thumbnail", "smallThumbnail"):
        url = image_links.get(key)
        if url:
            url = url.replace("http://", "https://")
            return url
    return None


def parse_volume(item):
    """Parse a Google Books volume dict into site book schema. Returns None if invalid."""
    try:
        volume_info = item.get("volumeInfo", {})
        volume_id = item.get("id", "")

        # Cover image required
        cover_image = build_cover_image(volume_info)
        if not cover_image:
            return None

        # Description must be at least 100 chars
        description = volume_info.get("description", "") or ""
        if len(description) < 100:
            return None

        # Industry identifiers required
        industry_identifiers = volume_info.get("industryIdentifiers")
        if not industry_identifiers:
            return None

        # ASIN required
        asin = get_asin(industry_identifiers)
        if not asin:
            return None

        # Skip if BOTH avgRating < 3.5 AND ratingsCount < 10
        avg_rating = volume_info.get("averageRating")
        ratings_count = volume_info.get("ratingsCount", 0) or 0
        if avg_rating is not None:
            if float(avg_rating) < 3.5 and int(ratings_count) < 10:
                return None

        # Language must be en or de
        language = volume_info.get("language", "en")
        if language not in ("en", "de"):
            return None

        # Title + subtitle
        title = volume_info.get("title", "").strip()
        subtitle = volume_info.get("subtitle", "").strip()
        full_title = f"{title}: {subtitle}" if subtitle else title

        slug = slugify(full_title)

        authors = volume_info.get("authors", []) or []
        author = ", ".join(authors) if authors else "Unknown"

        google_cats = volume_info.get("categories") or []
        categories = map_categories(google_cats)

        cover_image_fallback = (
            f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.LZZZZZZZ.jpg"
        )
        cover_image_google = (
            f"https://books.google.com/books/content?id={volume_id}"
            f"&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        )

        marketplaces = {
            "amazon_us": f"https://www.amazon.com/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_uk": f"https://www.amazon.co.uk/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_de": f"https://www.amazon.de/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_nl": f"https://www.amazon.nl/dp/{asin}?tag={AFFILIATE_TAG}",
        }

        short_description = (
            description[:200] + "..." if len(description) > 200 else description
        )

        pages = volume_info.get("pageCount") or None
        published_date = volume_info.get("publishedDate", "") or ""

        return {
            "slug": slug,
            "asin": asin,
            "title": full_title,
            "description": description,
            "author": author,
            "coverImage": cover_image_google,
            "coverImageFallback": cover_image_fallback,
            "categories": categories,
            "tags": [],
            "language": language,
            "pages": pages,
            "price": "",
            "currency": "USD",
            "reviewCount": int(ratings_count) if ratings_count else 0,
            "starRating": float(avg_rating) if avg_rating is not None else None,
            "marketplaces": marketplaces,
            "isOwnBook": False,
            "hookText": "",
            "publishedDate": published_date,
            "shortDescription": short_description,
            "source": "google_books",
        }
    except Exception as exc:
        print(f"[SKIP] Parse error: {exc}")
        return None


def extract_asin_from_amazon_url(url):
    """Extract ASIN from an Amazon product URL."""
    if not url:
        return None
    match = re.search(r"/dp/([A-Z0-9]{10})", url)
    if match:
        return match.group(1)
    return None


def fetch_nyt_list(list_name, api_key):
    """Fetch a NYT bestseller list and return normalized book dicts."""
    url = NYT_BOOKS_API.format(**{"list": list_name})
    try:
        response = requests.get(url, params={"api-key": api_key}, timeout=15)
        if response.status_code != 200:
            print(f"[NYT] Error fetching {list_name}: HTTP {response.status_code}")
            return []
        data = response.json()
        books = data.get("results", {}).get("books", [])
        result = []
        for book in books:
            result.append({
                "title": book.get("title", ""),
                "author": book.get("author", ""),
                "description": book.get("description", ""),
                "amazon_product_url": book.get("amazon_product_url", ""),
                "book_image": book.get("book_image", ""),
                "rank": book.get("rank", 0),
            })
        return result
    except Exception as exc:
        print(f"[NYT] Exception fetching {list_name}: {exc}")
        return []


def nyt_to_book(nyt_item, list_name):
    """Convert a NYT bestseller entry to site book schema."""
    try:
        asin = extract_asin_from_amazon_url(nyt_item.get("amazon_product_url", ""))
        if not asin:
            return None

        cover = nyt_item.get("book_image") or None
        if not cover:
            return None

        title = nyt_item.get("title", "").strip().title()
        author = nyt_item.get("author", "").strip() or "Unknown"
        description = nyt_item.get("description", "").strip()

        categories = NYT_LIST_CATEGORY_MAP.get(list_name, ["history"])
        slug = slugify(title)

        cover_image_fallback = (
            f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.LZZZZZZZ.jpg"
        )

        marketplaces = {
            "amazon_us": f"https://www.amazon.com/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_uk": f"https://www.amazon.co.uk/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_de": f"https://www.amazon.de/dp/{asin}?tag={AFFILIATE_TAG}",
            "amazon_nl": f"https://www.amazon.nl/dp/{asin}?tag={AFFILIATE_TAG}",
        }

        short_description = (
            description[:200] + "..." if len(description) > 200 else description
        )

        return {
            "slug": slug,
            "asin": asin,
            "title": title,
            "description": description,
            "author": author,
            "coverImage": cover,
            "coverImageFallback": cover_image_fallback,
            "categories": categories,
            "tags": [],
            "language": "en",
            "pages": None,
            "price": "",
            "currency": "USD",
            "reviewCount": 9999,
            "starRating": None,
            "marketplaces": marketplaces,
            "isOwnBook": False,
            "hookText": "",
            "publishedDate": "",
            "shortDescription": short_description,
            "source": "nyt_bestseller",
        }
    except Exception as exc:
        print(f"[NYT] Parse error for {nyt_item.get('title', '?')}: {exc}")
        return None


def fetch_query(query, api_key, lang_restrict="en"):
    """Fetch Google Books results for a query. Retries up to 3 times on 429 with backoff."""
    params = {
        "q": query,
        "maxResults": 40,
        "orderBy": "relevance",
        "printType": "books",
    }
    if lang_restrict:
        params["langRestrict"] = lang_restrict
    if api_key:
        params["key"] = api_key

    backoff_times = [30, 60, 120]
    for attempt in range(3):
        try:
            response = requests.get(GOOGLE_BOOKS_API, params=params, timeout=20)
            if response.status_code == 429:
                wait = backoff_times[attempt]
                print(f"[RATE LIMIT] waiting {wait}s...")
                time.sleep(wait)
                continue
            if response.status_code != 200:
                print(f"[Google Books] Error for query '{query}': HTTP {response.status_code}")
                return []
            data = response.json()
            return data.get("items", []) or []
        except Exception as exc:
            print(f"[Google Books] Exception for query '{query}': {exc}")
            return []

    print(
        f"[Google Books] Failed after 3 attempts for '{query}'. "
        "Consider adding GOOGLE_BOOKS_API_KEY to scripts/secrets.env to increase rate limit."
    )
    return []


def build_existing_sets(books):
    """Return (set of uppercase ASINs, set of lowercase titles) for deduplication."""
    existing_asins = set()
    existing_titles = set()
    for book in books:
        asin = book.get("asin", "")
        title = book.get("title", "")
        if asin:
            existing_asins.add(asin.upper())
        if title:
            existing_titles.add(title.lower())
    return existing_asins, existing_titles


def _load_secrets():
    """Read scripts/secrets.env, return dict of key=value pairs."""
    secrets_path = os.path.join(SCRIPT_DIR, "secrets.env")
    result = {}
    if not os.path.isfile(secrets_path):
        return result
    try:
        with open(secrets_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" not in line:
                    continue
                key, _, value = line.partition("=")
                key = key.strip()
                value = value.strip()
                if key and value:
                    result[key] = value
    except Exception as exc:
        print(f"[secrets] Could not read secrets.env: {exc}")
    return result


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    parser = argparse.ArgumentParser(
        description="Import books from Google Books API and NYT Bestsellers into data/books.json"
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--nyt-only", action="store_true", help="Only fetch NYT lists, skip Google")
    args = parser.parse_args()

    # Load secrets
    secrets = _load_secrets()

    google_api_key = os.environ.get("GOOGLE_BOOKS_API_KEY") or secrets.get("GOOGLE_BOOKS_API_KEY")
    nyt_api_key = os.environ.get("NYT_BOOKS_API_KEY") or secrets.get("NYT_BOOKS_API_KEY")

    if not google_api_key:
        print("[WARNING] GOOGLE_BOOKS_API_KEY not set. You may hit rate limits quickly.")
    if not nyt_api_key:
        print("[WARNING] NYT_BOOKS_API_KEY not set. NYT bestseller lists will be skipped.")

    # Load existing books.json
    existing_books = []
    if os.path.isfile(BOOKS_JSON_PATH):
        try:
            with open(BOOKS_JSON_PATH, "r", encoding="utf-8") as f:
                raw = json.load(f)
            if isinstance(raw, dict) and "books" in raw:
                existing_books = raw["books"]
            elif isinstance(raw, list):
                existing_books = raw
            else:
                existing_books = []
        except Exception as exc:
            print(f"[ERROR] Could not load books.json: {exc}")
            existing_books = []

    existing_asins, existing_titles = build_existing_sets(existing_books)
    print(f"Loaded {len(existing_books)} existing books.")

    # -----------------------------------------------------------------------
    # NYT Bestsellers
    # -----------------------------------------------------------------------
    nyt_books = []
    nyt_asins_seen = set()

    if nyt_api_key:
        for list_name in NYT_LISTS:
            print(f"[NYT] Fetching {list_name}...")
            entries = fetch_nyt_list(list_name, nyt_api_key)
            for entry in entries:
                book = nyt_to_book(entry, list_name)
                if book is None:
                    continue
                asin_upper = book["asin"].upper()
                title_lower = book["title"].lower()
                if asin_upper in existing_asins or asin_upper in nyt_asins_seen:
                    continue
                if title_lower in existing_titles:
                    continue
                nyt_books.append(book)
                nyt_asins_seen.add(asin_upper)
            time.sleep(0.5)
        print(f"[NYT] Found {len(nyt_books)} new books from NYT lists.")
    else:
        print("[NYT] Skipping NYT (no API key).")

    # -----------------------------------------------------------------------
    # Google Books
    # -----------------------------------------------------------------------
    google_books = []
    google_asins_seen = set(nyt_asins_seen)

    if not args.nyt_only:
        all_queries = [(q, "en") for q in EN_QUERIES] + [(q, "de") for q in DE_QUERIES]
        total_queries = len(all_queries)

        for idx, (query, lang) in enumerate(all_queries, 1):
            print(f"[Google] ({idx}/{total_queries}) Querying: {query!r}")
            items = fetch_query(query, google_api_key, lang_restrict=lang)
            for item in items:
                book = parse_volume(item)
                if book is None:
                    continue
                # Apply per-query category override (fixes mislabelling)
                book = apply_query_category_override(book, query)
                asin_upper = book["asin"].upper()
                title_lower = book["title"].lower()
                if asin_upper in existing_asins or asin_upper in google_asins_seen:
                    continue
                if title_lower in existing_titles:
                    continue
                google_books.append(book)
                google_asins_seen.add(asin_upper)
            time.sleep(0.25)

        print(f"[Google] Found {len(google_books)} new books from Google Books.")
    else:
        print("[Google] Skipping Google Books (--nyt-only).")

    # -----------------------------------------------------------------------
    # Combine: NYT first, then Google
    # -----------------------------------------------------------------------
    new_books = nyt_books + google_books

    if args.dry_run:
        print(
            f"\n[DRY RUN] Would add {len(new_books)} new books "
            f"({len(nyt_books)} NYT + {len(google_books)} Google):\n"
        )
        for book in new_books:
            cats = ", ".join(book.get("categories", []))
            print(f"  [{book['source']}] {book['title']} | {book['asin']} | {cats}")
        return

    if not new_books:
        print("No new books found. books.json unchanged.")
        return

    # NYT books prepended before google books, then existing books
    updated_books = nyt_books + google_books + existing_books

    try:
        os.makedirs(os.path.dirname(os.path.abspath(BOOKS_JSON_PATH)), exist_ok=True)
        with open(BOOKS_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump({"books": updated_books}, f, ensure_ascii=False, indent=2)
        print(
            f"Added {len(new_books)} new books ({len(nyt_books)} NYT + {len(google_books)} Google), "
            f"total now {len(updated_books)}."
        )
    except Exception as exc:
        print(f"[ERROR] Could not write books.json: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
