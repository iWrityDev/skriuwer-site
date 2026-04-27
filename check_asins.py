#!/usr/bin/env python3
"""
Check Amazon product pages for all kept third-party books.
Uses urllib to HEAD/GET amazon.com/dp/{isbn} - if page title is 'Page Not Found' it's dead.
"""
import json, os, time, urllib.request, urllib.error, re

os.chdir("C:/Users/aukeh/skriuwer-site")

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

third = [b for b in data["books"] if not b.get("isOwnBook")]
print(f"Checking {len(third)} third-party books on Amazon...\n")

DEAD = []
LIVE = []
ERROR = []

for i, book in enumerate(third):
    asin  = book.get("asin", "")
    title = book.get("title", "")[:45]
    url   = f"https://www.amazon.com/dp/{asin}"

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        })
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            final_url = resp.geturl()

            # Check if it's a "Page Not Found"
            if "Page Not Found" in html[:2000] or "page not found" in html[:2000].lower():
                tag = "DEAD"
                DEAD.append(book)
            elif "dp/" in final_url or "gp/product" in final_url or asin in final_url:
                # Extract product title from HTML
                m = re.search(r'<title>(.*?)</title>', html[:3000])
                page_title = m.group(1)[:60] if m else "unknown"
                tag = "LIVE"
                LIVE.append({**book, "_page_title": page_title})
            else:
                # Redirected somewhere unexpected (captcha, etc.)
                tag = f"REDIRECT→{final_url[:40]}"
                ERROR.append(book)

    except urllib.error.HTTPError as e:
        if e.code == 404:
            tag = "404"
            DEAD.append(book)
        elif e.code == 503:
            tag = f"503(bot)"
            ERROR.append(book)
        else:
            tag = f"HTTP{e.code}"
            ERROR.append(book)
    except Exception as e:
        tag = f"ERR:{str(e)[:20]}"
        ERROR.append(book)

    print(f"[{i+1:2d}/{len(third)}] {tag:12s} | {asin:12s} | {title}")
    time.sleep(1.2)  # polite - avoid rate limiting

print(f"\n{'='*70}")
print(f"LIVE: {len(LIVE)}")
print(f"DEAD: {len(DEAD)}")
print(f"ERROR/BOT: {len(ERROR)}")

print(f"\nDEAD ASINs (need fixing):")
for b in DEAD:
    print(f"  {b['asin']:12s} | {b['title'][:50]} | slug: {b['slug']}")

print(f"\nERROR (bot-blocked, cannot verify):")
for b in ERROR:
    print(f"  {b['asin']:12s} | {b['title'][:50]}")

# Write dead list
with open("dead_asins.json", "w", encoding="utf-8") as f:
    json.dump(DEAD, f, ensure_ascii=False, indent=2)
print(f"\nWrote dead_asins.json")
