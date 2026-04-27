"""
Run before every books.json commit: python scripts/validate_books.py
Catches: P/ placeholder images, broken image URLs, Amazon 404s.
Exit code 1 = issues found (do not commit until fixed).
"""
import json, sys, urllib.request, urllib.error, re, time

BOOKS_PATH = 'data/books.json'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

with open(BOOKS_PATH, encoding='utf-8') as f:
    books = json.load(f)['books']

errors = []
warnings = []

def head(url, timeout=8):
    try:
        req = urllib.request.Request(url, method='HEAD', headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, int(r.headers.get('Content-Length', 0)), r.headers.get('Content-Type','')
    except urllib.error.HTTPError as e:
        return e.code, 0, ''
    except Exception as e:
        return 0, 0, str(e)

print(f'Validating {len(books)} books...\n')

for i, book in enumerate(books):
    slug = book.get('slug', f'index-{i}')
    asin = book.get('asin', '')
    cover = book.get('coverImage', '')
    fallback = book.get('coverImageFallback', '')

    # 1. Catch P/{ASIN} placeholder format
    if '/images/P/' in cover:
        errors.append(f'[{slug}] coverImage uses P/ placeholder format — scrape real I/ URL from Amazon product page')

    # 2. Catch ssl-images-amazon.com (old CDN, often returns 1×1 placeholder)
    if 'ssl-images-amazon' in cover or 'images-na.ssl' in cover:
        errors.append(f'[{slug}] coverImage uses old ssl-images-amazon CDN — replace with m.media-amazon.com I/ URL')

    # 3. Check cover image loads and is a real image (not 1×1)
    if cover and cover.startswith('http'):
        status, size, ctype = head(cover)
        if status != 200:
            errors.append(f'[{slug}] coverImage HTTP {status}: {cover}')
        elif 'image' not in ctype.lower():
            errors.append(f'[{slug}] coverImage not an image (Content-Type: {ctype}): {cover}')
        elif size > 0 and size < 2000:
            errors.append(f'[{slug}] coverImage suspiciously small ({size} bytes) — likely 1×1 placeholder: {cover}')
        time.sleep(0.3)

    # 4. For own books, check Amazon DP URL exists
    if book.get('isOwnBook') and asin:
        dp_url = f'https://www.amazon.com/dp/{asin}'
        status, _, _ = head(dp_url)
        if status == 404:
            errors.append(f'[{slug}] Amazon product 404: {dp_url}')
        elif status not in (200, 301, 302, 303):
            warnings.append(f'[{slug}] Amazon product returned HTTP {status}: {dp_url}')
        time.sleep(0.5)

print('─' * 60)
if errors:
    print(f'ERRORS ({len(errors)}) — fix before committing:')
    for e in errors:
        print(f'  ✗ {e}')
if warnings:
    print(f'\nWARNINGS ({len(warnings)}):')
    for w in warnings:
        print(f'  ⚠ {w}')
if not errors and not warnings:
    print('All checks passed.')

sys.exit(1 if errors else 0)
