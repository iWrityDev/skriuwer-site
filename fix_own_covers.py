#!/usr/bin/env python3
"""
Replace blurry Amazon /images/P/ covers with high-res /images/I/ covers
for 40 own books. /images/P/ returns ~300px thumbnails for B0 Kindle
ASINs; /images/I/ returns 1200-1500px product-page hero images.
"""
import json, os

os.chdir("C:/Users/aukeh/skriuwer-site")

COVERS = {
    "asin-b0dv4lpqvx": "https://m.media-amazon.com/images/I/612D6Zz-vML._SL1430_.jpg",
    "asin-b0f2n3fskn": "https://m.media-amazon.com/images/I/61C+4WI5ErL._SL1499_.jpg",
    "asin-b0dr39f7ws": "https://m.media-amazon.com/images/I/71dtymsKooL._SL1430_.jpg",
    "asin-b0f1ymc7hb": "https://m.media-amazon.com/images/I/717GOFuD9mL._SL1499_.jpg",
    "asin-b0fvx3n6fq": "https://m.media-amazon.com/images/I/61CcgaOJ-NL._SL1499_.jpg",
    "asin-b0dy88wr85": "https://m.media-amazon.com/images/I/710GjiOfSPL._SL1430_.jpg",
    "asin-b0fnwjhyb2": "https://m.media-amazon.com/images/I/71UQenBW6BL._SL1500_.jpg",
    "asin-b0f1tyfq8x": "https://m.media-amazon.com/images/I/71dHDKKTB6L._SL1499_.jpg",
    "asin-b0fwdr5xx2": "https://m.media-amazon.com/images/I/71ngEouRdjL._SL1500_.jpg",
    "asin-b0fx9jk2xb": "https://m.media-amazon.com/images/I/81QE4npu7oL._SL1500_.jpg",
    "asin-b0gpx97z1y": "https://m.media-amazon.com/images/I/71ad01Wv96L._SL1430_.jpg",
    "asin-b0dcgj49sg": "https://m.media-amazon.com/images/I/61SXqvCuoqL._SL1430_.jpg",
    "asin-b0dxfsbpjk": "https://m.media-amazon.com/images/I/71jgQvxqI-L._SL1422_.jpg",
    "asin-b0fwxf5ct2": "https://m.media-amazon.com/images/I/61+OzgO4URL._SL1499_.jpg",
    "asin-b0f84pqp1z": "https://m.media-amazon.com/images/I/812dh44pU+L._SL1500_.jpg",
    "asin-b0gqlnm7zx": "https://m.media-amazon.com/images/I/71o3nofgFuL._SL1499_.jpg",
    "asin-b0dnb9ghwq": "https://m.media-amazon.com/images/I/71rqgDXyUhL._SL1430_.jpg",
    "asin-b0gpxc27g9": "https://m.media-amazon.com/images/I/61+4apAsQHL._SL1499_.jpg",
    "asin-b0dqp7jt32": "https://m.media-amazon.com/images/I/712cFlnOwwL._SL1430_.jpg",
    "asin-b0gs3xr1ky": "https://m.media-amazon.com/images/I/81B1nETbVyL._SL1500_.jpg",
    "asin-b0fcyhxhpk": "https://m.media-amazon.com/images/I/81hzEGmHmcL._SL1500_.jpg",
    "asin-b0fchfwlsh": "https://m.media-amazon.com/images/I/81CzvlAI8GL._SL1500_.jpg",
    "asin-b0djbq347k": "https://m.media-amazon.com/images/I/71FRmNORYtL._SL1430_.jpg",
    "asin-1490353003": "https://m.media-amazon.com/images/I/61jNrGZ41KL._SL1360_.jpg",
    "asin-b0dv96m1yj": "https://m.media-amazon.com/images/I/71wKCo1FXEL._SL1430_.jpg",
    "asin-b0cmn5qvc8": "https://m.media-amazon.com/images/I/71IxgvYePhL._SL1500_.jpg",
    "asin-b0dfmph16z": "https://m.media-amazon.com/images/I/71sJarqaGLL._SL1422_.jpg",
    "asin-b0f2ms8c2c": "https://m.media-amazon.com/images/I/61jPodOkpaL._SL1499_.jpg",
    "asin-b0drvjpjsk": "https://m.media-amazon.com/images/I/71sZepiendL._SL1430_.jpg",
    "asin-b0dt193dsv": "https://m.media-amazon.com/images/I/61Mgi80wShL._SL1499_.jpg",
    "asin-b0gn4j3grk": "https://m.media-amazon.com/images/I/71JAaUdxVIL._SL1500_.jpg",
    "asin-b0grlbzclc": "https://m.media-amazon.com/images/I/81OSe5pFgFL._SL1500_.jpg",
    "asin-b0f4942bt8": "https://m.media-amazon.com/images/I/61gzvWhPosL._SL1499_.jpg",
    "asin-b0f29zn5jj": "https://m.media-amazon.com/images/I/71bKyqN2ptL._SL1499_.jpg",
    "asin-b0f2zwh34y": "https://m.media-amazon.com/images/I/619MupBoz6L._SL1499_.jpg",
    "asin-b0d4ycrlw4": "https://m.media-amazon.com/images/I/61Wyk4KyJ8L._SL1422_.jpg",
    "asin-b0fd5cxxs7": "https://m.media-amazon.com/images/I/81XcZPC1EcL._SL1500_.jpg",
    "asin-b0dhgkvmkq": "https://m.media-amazon.com/images/I/71+B5cZd1dL._SL1499_.jpg",
    "asin-b0dnq7kgpc": "https://m.media-amazon.com/images/I/61vfSALd6mL._SL1430_.jpg",
    "asin-b0f475wl3x": "https://m.media-amazon.com/images/I/61+5JpSAK9L._SL1499_.jpg",
}

with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)

updated = 0
for book in data["books"]:
    if book.get("slug") in COVERS:
        old = book.get("coverImage", "")
        new_cover = COVERS[book["slug"]]
        # Keep old (low-res /images/P/) URL as fallback
        if old and old != new_cover and "m.media-amazon.com/images/P/" in old:
            book["coverImageFallback"] = old
        book["coverImage"] = new_cover
        updated += 1

print(f"Updated {updated} own-book covers")

# Sanity: no visible own book should still be on /images/P/
with open("data/deleted_slugs.json", "r", encoding="utf-8") as f:
    deleted = set(json.load(f))
still_blurry = [
    b["slug"] for b in data["books"]
    if b.get("isOwnBook") and b["slug"] not in deleted
    and "m.media-amazon.com/images/P/" in (b.get("coverImage") or "")
]
print(f"Own books still on low-res /images/P/: {len(still_blurry)}")
for s in still_blurry:
    print(f"  - {s}")

with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

with open("data/books.json", "rb") as f:
    print("BOM:", "WARNING" if f.read(3) == b'\xef\xbb\xbf' else "OK (no BOM)")
