# skriuwer-site — project rules

Next.js 15 app on Vercel. Data-driven book catalog served from
`data/books.json` (statically generated at build time).

## Voice & copywriting (LOAD-BEARING — enforce on every edit)

**Every piece of copy you write or touch on this site must pass this
filter.** These rules carry the same weight as the technical ones
below — sloppy word choices make the site read as AI slop and the
user has explicitly asked, more than once, to keep that out.

### Hard bans

1. **No em-dashes (`—`, `&mdash;`, or U+2014) as clause separators.**
   This is the single strongest AI tell. Use a comma, period,
   colon, or parentheses instead. Acceptable em-dash uses are
   basically zero on this site — if you find yourself reaching for
   one, split the sentence or use a comma.

   - Wrong: `"Skriuwer.com — meaning 'writer' in Frisian — was founded..."`
   - Right: `"Skriuwer.com, meaning 'writer' in Frisian, was founded..."`
   - Wrong: `"169 curated titles across history, mythology — every one worth your time"`
   - Right: `"169 curated titles across history, mythology. Every one worth your time."`

2. **No AI-speak phrases.** Grep these before committing any copy:
   `delve`, `dive into`, `it's worth noting`, `it is worth`,
   `in conclusion`, `in today's world`, `landscape`, `tapestry`,
   `seamless`, `seamlessly`, `leverage`, `unlock`,
   `unleash`, `unveil`, `cutting-edge`, `state-of-the-art`,
   `robust`, `plethora`, `myriad`, `moreover`, `furthermore`,
   `holistic`, `curate` (the verb, overused — use "pick" / "choose"),
   `empower` / `empowering`, `embark`, `realm`, `journey` (when
   not literal), `navigate the complexities`, `in the modern age`.

3. **No passive voice where active works.**
   - Wrong: `"The best books were chosen by our editors."`
   - Right: `"Our editors chose the best books."`

4. **No corporate-speak hedging.** `"arguably"`, `"perhaps"`,
   `"in many ways"`, `"it can be said that"`, `"tends to"` → cut them.

5. **No hyped adjectives paired with abstract nouns.** "Ultimate
   companion", "comprehensive guide", "essential resource",
   "definitive handbook", "incredible journey". These say nothing.
   Replace with a concrete promise: "300 pages", "1300 sentences",
   "reviewed by 50,000 readers".

### Preferred voice

- **Direct second-person.** `"You"`, `"your"`. Not `"readers"`,
  `"one", or `"we" + abstract`.
- **Specific numbers.** `169 books`, `35 reading lists`,
  `1500px covers` — not `hundreds of books`, `many lists`.
- **Short sentences.** If a sentence has two em-dashes or three
  commas, split it.
- **Contractions OK.** `it's`, `don't`, `you'll`. Keep it
  conversational.
- **"Because"-first promises.** Open with what the reader gets,
  then why. `"Find your next read. 169 titles hand-picked by people
  who actually read them."` beats `"At Skriuwer.com we believe..."`.

### Find violations before shipping

Run in the repo root before any non-data commit that touches copy:

```bash
grep -rEn "—|&mdash;|delve|dive into|it's worth noting|in conclusion|landscape|tapestry|seamless|leverage|unlock|unleash|plethora|myriad|moreover|furthermore|holistic|empower|embark|realm" src/
```

If the grep hits anything in code you're adding or editing, rewrite
it before pushing. `data/books.json` is exempt — those are Amazon's
own descriptions, not our copy, so leave them alone.

---

## When adding a new book to the site

> **Don't skip any step.** Each one fixes a real bug we've already shipped and had to back out.

### 1. Decide if it's an own book or a third-party book

- **Own book** (`isOwnBook: true`): published by Skriuwer on KDP, or a
  Skriuwer.com-branded edition. These link to Amazon with the site's
  affiliate tag and always show the **★ Our Pick** badge.
- **Third-party book** (`isOwnBook: false`): someone else's book we
  recommend. Same affiliate link, no "Our Pick" badge.

### 2. Get the correct Amazon ASIN — DO NOT guess, and DO NOT trust the first search hit

**Every own-book ISBN-10 that was fabricated / copy-pasted wrong once hit
the live site, and we caught it only after the user complained:**
"The History of Israel" linked to _Catechism of the Catholic Church_,
"Dinosaur Conspiracies" linked to a children's book, etc.

Verification is non-negotiable. Steps:

1. Open `https://www.amazon.com/dp/{asin}` and read the `<title>` tag.
2. Confirm the product title matches the book title. "Page Not Found"
   is obviously a fail; a page that loads but shows a different book is
   also a fail. For Kindle vs paperback mismatches: pick whichever
   edition you actually want to sell and use its ASIN.
3. Watch out for Amazon search poisoning the first result with a
   sponsored ad (seen: `1939714281` → "What's the Point?" showing up for
   Quiet, Why We Sleep, Mindset, _and_ Influence searches). Skip
   sponsored results: in the search DOM, reject items with
   `.puis-sponsored-label-text` or `[aria-label="Sponsored"]`.

For own Skriuwer books specifically, the fastest way to get the real
ASIN is to page through `/s?k=Skriuwer&i=stripbooks&page=N` on Amazon
and match by title. Don't fabricate ISBN-10s.

### 3. Cover image: use the high-res Amazon `/images/I/` URL

**Never use `https://m.media-amazon.com/images/P/{ISBN}...`.** For
physical-book ISBNs that CDN returns a 1×1-pixel transparent
placeholder with HTTP 200, so `onError` never fires. Every third-party
cover on the site used to be a blank square because of this.

Instead, scrape the product page and grab the `hiRes` URL:

```js
const resp = await fetch(`/dp/${asin}`);
const html = await resp.text();
const m = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
// m[1] is the 1000-1500px cover, e.g.
// https://m.media-amazon.com/images/I/81kg51XRc1L._SL1500_.jpg
```

If `hiRes` is missing, the image ID still shows up in the
`_AC_SR100,100_` thumbnail URL — grab the ID and construct the
`_SL1500_` URL yourself.

**Also don't use OpenLibrary `-L.jpg` as the primary.** It returns a
43-byte "no cover" placeholder for any ISBN it doesn't have, which
shows up in the browser as a broken/grey square. Keep OpenLibrary as
`coverImageFallback` only.

For **own books**, the primary `coverImage` should be the Shopify CDN
URL (`cdn.shopify.com`). Amazon cover is the `coverImageFallback`.

### 4. Book entry shape (`data/books.json`)

```json
{
  "slug": "kebab-case-title-author",
  "asin": "B0XXXXXXXX or 1234567890",
  "title": "Exact book title",
  "author": "Author Name",
  "description": "Long description...",
  "shortDescription": "1-2 sentence hook, ~180 chars",
  "coverImage":         "https://m.media-amazon.com/images/I/{id}._SL1500_.jpg",
  "coverImageFallback": "https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg",
  "categories": ["history"],
  "tags": [],
  "language": "en",
  "pages": 200,
  "price": "",
  "currency": "USD",
  "reviewCount": 0,
  "starRating": 0,
  "marketplaces": {
    "amazon_us": "https://www.amazon.com/dp/{asin}?tag=31813-20",
    "amazon_uk": "https://www.amazon.co.uk/dp/{asin}?tag=31813-20",
    "amazon_de": "https://www.amazon.de/dp/{asin}?tag=31813-20",
    "amazon_nl": "https://www.amazon.nl/dp/{asin}?tag=31813-20"
  },
  "isOwnBook": false,
  "publishedDate": "YYYY-MM-DD",
  "source": "amazon"
}
```

The affiliate tag is **`31813-20`** everywhere. Don't invent a different
one per marketplace — the frontend rewrites the hostname at runtime and
reuses the same tag.

### 5. JSON file hygiene — always edit with Python, never with PowerShell

`ConvertTo-Json` in Windows PowerShell will:
- Prepend a UTF-8 BOM (breaks Next.js build on Vercel)
- Default to 4-space indent (makes the diff huge and unreviewable)
- Escape non-ASCII characters as `\uXXXX` (mangles German umlauts,
  Dutch IJ, Frisian characters)

Every past corruption of `data/books.json` has been from someone
running a PowerShell one-liner "to be quick." Use Python:

```python
import json
with open("data/books.json", "r", encoding="utf-8") as f:
    data = json.load(f)
# ... edits ...
with open("data/books.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")
```

Confirm no BOM after writing:

```python
with open("data/books.json", "rb") as f:
    assert f.read(3) != b"\xef\xbb\xbf", "BOM detected!"
```

### 6. `data/deleted_slugs.json` is the hide-list

`src/lib/books.ts` filters out every slug in this file at build time.
If a book you just added isn't showing up on `/books`, check here
before debugging anywhere else — we've hit that trap on Quiet, Atomic
Habits, and others.

### 7. Don't label a book "Kindle" — the frontend doesn't anymore

The previous behavior (badge on the card, "Buy on Kindle" on the
button) was misleading: KDP gives paperbacks B0 ASINs too, so many
"Kindle" books opened to a paperback listing on Amazon. `BookCard.tsx`
and `BuyButton.tsx` no longer branch on `asin.startsWith("B0")` for
user-facing text. If you reintroduce a format label, verify via the
Amazon product page what format that specific ASIN actually sells —
don't infer it from the ASIN prefix.

## Build + deploy

- GitHub push to `master` triggers Vercel auto-deploy. Typical build is
  50s after the deployment leaves the Vercel queue; the queue wait
  itself is often 5–10 min.
- Vercel's edge cache for static pages can hold the old version well
  past the deploy finish time — check `X-Vercel-Cache` and `Age` with
  `curl -sI -k --tls-max 1.2 -L https://www.skriuwer.com/books`.
- `npx --yes vercel ls skriuwer-site | head -6` shows queue + ready
  states without burning a CLI deployment from the 100/day quota.
- `.github/workflows/vercel-redeploy.yml` runs nightly at 23:50 UTC to
  bump an empty commit — this exists purely so Vercel rebuilds after
  the daily rate limit resets at 23:40 UTC. Do not remove it.

## Deployment verification (mandatory — global rule)

From `~/.claude/CLAUDE.md`: after any data or code change, **verify on
the actual live URL**, not CLI output. Use the Chrome extension to
navigate to the affected page and run a JS DOM check that confirms the
specific change (e.g. book count, cover URL starts with
`m.media-amazon.com/images/I/`, Amazon link contains the new ASIN and
not the old one).

## Amazon-link behavior (for reference)

- `BuyButton.tsx` is a client component. SSR emits an `amazon.com` link
  so hydration stays clean, then `useEffect` reads `navigator.language`,
  maps it to a country (see `LANG_TO_COUNTRY` in
  `src/lib/affiliate.ts`), and rewrites the href to `amazon.nl` /
  `amazon.de` / `amazon.co.uk` / etc.
- We do not load Amazon OneLink's JavaScript — the redirect is done in
  our own `useEffect` because the OneLink JS broke the CSP once and
  added ~50 kB for something we can do in 20 lines.

## Paths worth knowing

- `data/books.json` — single source of truth for the catalog
- `data/deleted_slugs.json` — build-time hide list
- `data/blog-posts.json` — separate feed (not books)
- `src/lib/books.ts` — reads `books.json`, applies the deleted-slug
  filter and the "only isOwnBook allowed to have a B0 ASIN" filter
- `src/lib/affiliate.ts` — URL + locale logic for Amazon links
- `src/components/BookCard.tsx` — grid tile (★ Our Pick badge, cover
  with onError fallback)
- `src/components/BookCoverImage.tsx` — big detail-page cover (same
  fallback logic as BookCard)
- `src/components/BuyButton.tsx` — the locale-redirected buy button
- `src/app/books/[slug]/page.tsx` — per-book detail page + JSON-LD
- `src/app/icon.svg`, `src/app/apple-icon.svg` — browser tab favicon

## Helper scripts at repo root (Python, not committed-quality — throwaway)

- `verify_third_party.py` — audits cover size + ISBN on Open Library
- `clean_third_party.py` — drops books whose OpenLibrary cover is < 5 kB
- `audit_books.py` — earlier version of the same audit
- `fix_books.py` — upgrades Amazon image URLs to `_SX1000_`, patches
  own-book B0 ASINs from the `asin-b0xxxxxxxx` slug pattern
- `fix_asins.py` / `fix_asins_v2.py` — applied the third-party ASIN
  fixes (Leadership Challenge, Quiet, etc.)
- `fix_own_asins.py` — applied the 56 own-book ASIN fixes
- `update_covers.py` — applied the Amazon high-res cover replacements
- `check_asins.py` — tries to fetch Amazon pages from Python (mostly
  blocked by Amazon's bot detection; prefer the Chrome extension for
  this)

When running these, `cd /c/Users/aukeh/skriuwer-site` first — several
read `data/books.json` via a relative path.
