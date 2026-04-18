/**
 * seed_books_pass2.mjs — Second pass targeting high-value books missed in pass 1.
 * Uses shorter, more targeted queries to avoid wrong matches.
 * Filters out non-English editions (ISBN starting with 3 = German publisher).
 *
 * Usage:
 *   node scripts/seed_books_pass2.mjs --save
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_JSON   = join(__dirname, "../data/books.json");
const DELETED_JSON = join(__dirname, "../data/deleted_slugs.json");
const SAVE = process.argv.includes("--save");

// Targeted seed list — shorter queries, explicit English restriction
// [searchQuery, categories[], approxReviewCount, approxStarRating]
const SEED = [
  // Big misses from pass 1
  ["Sapiens Harari history humankind",               ["history"],                      110000, 4.5],
  ["Atomic Habits James Clear",                      ["self-help"],                    155000, 4.8],
  ["Guns Germs Steel Diamond",                       ["history", "science"],            19000, 4.6],
  ["A Brief History of Time Hawking",                ["science"],                       27000, 4.5],
  ["Unbroken Hillenbrand",                           ["history", "dark-history", "biography"], 95000, 4.8],
  ["Band of Brothers Ambrose",                       ["history", "dark-history"],       24000, 4.7],
  ["Night Elie Wiesel memoir",                       ["history", "dark-history", "biography"], 72000, 4.7],
  ["Diary of a Young Girl Anne Frank",               ["history", "dark-history", "biography"], 62000, 4.8],
  ["D-Day Stephen Ambrose",                          ["history", "dark-history"],        8500, 4.7],
  ["The Hiding Place Corrie ten Boom",               ["history", "dark-history", "religion", "biography"], 45000, 4.8],
  ["Subtle Art of Not Giving Mark Manson",           ["self-help"],                    185000, 4.5],
  ["7 Habits of Highly Effective People Covey",      ["self-help"],                     58000, 4.7],
  ["How to Win Friends Dale Carnegie",               ["self-help"],                     90000, 4.7],
  ["Think and Grow Rich Napoleon Hill",              ["self-help"],                     62000, 4.6],
  ["Extreme Ownership Jocko Willink",                ["self-help"],                     55000, 4.7],
  ["Deep Work Rules for Focused Success Cal Newport",["self-help"],                     48000, 4.6],
  ["Can't Hurt Me Master Mind David Goggins",        ["self-help", "biography"],       125000, 4.8],
  ["Educated memoir Tara Westover",                  ["biography"],                    195000, 4.7],
  ["Alexander Hamilton Ron Chernow biography",       ["biography", "history"],          16000, 4.7],
  ["Wild Cheryl Strayed",                            ["biography"],                    110000, 4.5],
  ["Cosmos Carl Sagan",                              ["science"],                       13000, 4.7],
  ["Selfish Gene Richard Dawkins",                   ["science"],                       11000, 4.5],
  ["Astrophysics People in Hurry Neil Tyson",        ["science"],                       33000, 4.6],
  ["Why We Sleep Matthew Walker science",            ["science", "self-help"],          55000, 4.5],
  ["The Code Book Simon Singh",                      ["science", "history"],             9000, 4.7],
  ["The Gene Siddhartha Mukherjee",                  ["science"],                       12000, 4.6],
  ["Myth of Sisyphus Albert Camus",                  ["philosophy"],                    12000, 4.4],
  ["Daily Stoic Ryan Holiday",                       ["philosophy", "self-help"],       65000, 4.7],
  ["Thus Spoke Zarathustra Nietzsche",               ["philosophy"],                    18000, 4.4],
  ["Influence Robert Cialdini persuasion",           ["psychology"],                    52000, 4.6],
  ["12 Rules for Life Jordan Peterson",              ["psychology", "self-help"],       85000, 4.6],
  ["Man's Search for Meaning Frankl",                ["religion", "psychology", "self-help"], 95000, 4.7],
  ["Purpose Driven Life Rick Warren",                ["religion", "self-help"],         20000, 4.7],
  ["Screwtape Letters CS Lewis",                     ["religion", "philosophy"],        36000, 4.7],
  ["Mere Christianity CS Lewis",                     ["religion"],                      55000, 4.8],
  ["Norse Mythology Neil Gaiman",                    ["mythology"],                     38000, 4.7],
  ["Mythology Edith Hamilton",                       ["mythology"],                     21000, 4.6],
  ["Hero with Thousand Faces Joseph Campbell",       ["mythology", "philosophy"],       10500, 4.5],
  ["Iliad Homer translation",                        ["mythology", "history"],          14000, 4.5],
  ["Greek Myths Robert Graves",                      ["mythology"],                      6000, 4.5],
  ["Troy A Novel Stephen Fry",                       ["mythology", "fiction"],          22000, 4.6],
  ["Circe Madeline Miller",                          ["mythology", "fiction"],         180000, 4.7],
  ["Song of Achilles Madeline Miller",               ["mythology", "fiction"],         220000, 4.8],
  ["Creature from Jekyll Island Griffin",            ["conspiracy", "history"],         16000, 4.7],
  ["Behold a Pale Horse William Cooper",             ["conspiracy"],                    13000, 4.5],
  ["None Dare Call It Conspiracy Gary Allen",        ["conspiracy", "history"],          4500, 4.4],
  ["Ordinary Men Reserve Police Battalion Browning", ["dark-history", "history"],        4200, 4.6],
  ["In Cold Blood Truman Capote",                    ["dark-history", "true-crime"],    55000, 4.6],
  ["I'll Be Gone in the Dark Michelle McNamara",     ["true-crime"],                    65000, 4.7],
  ["Mindhunter John Douglas serial killer FBI",      ["true-crime"],                    38000, 4.7],
  ["Helter Skelter Vincent Bugliosi Manson",         ["true-crime", "dark-history"],    25000, 4.6],
  ["The Storm Before the Storm Mike Duncan Roman",   ["history"],                        4500, 4.6],
  ["Dynasty Tom Holland Caesar Rome",                ["history"],                        6000, 4.5],
  ["SPQR Mary Beard Ancient Rome",                   ["history"],                        9500, 4.4],
  ["How Rome Fell Adrian Goldsworthy",               ["history"],                        2200, 4.4],
  ["Age of Vikings Anders Winroth",                  ["history"],                        1100, 4.4],
  ["Sea Wolves Lars Brownworth Vikings",             ["history"],                        3500, 4.5],
  ["Egyptian Mythology A Guide Gods Goddesses",      ["mythology", "history"],           1400, 4.3],
  ["Complete Gods Goddesses Ancient Egypt Wilkinson",["history", "mythology"],           2100, 4.6],
  ["Rise Fall Ancient Egypt Wilkinson",              ["history"],                        2800, 4.4],
  ["The Language Instinct Steven Pinker",            ["language-learning", "science"],   5000, 4.5],
  ["Babel Twenty Languages Gaston Dorren",           ["language-learning", "history"],   2800, 4.4],
  ["Fluent Forever language learning Wyner",         ["language-learning"],              9000, 4.3],
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[''`"]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isGermanIsbn(isbn) {
  // German publisher ISBNs start with 3
  if (!isbn) return false;
  const s = isbn.toString();
  if (s.startsWith("3") && s.length === 10) return true; // ISBN-10 German
  if (s.startsWith("978-3") || s.startsWith("9783")) return true; // ISBN-13 German
  if (s.startsWith("979-1") || s.startsWith("9791")) return true; // ISBN-13 French
  return false;
}

async function fetchGoogleBooks(query) {
  // Try up to 3 times with slightly different queries
  const attempts = [
    `${query}`,
    `intitle:"${query.split(" ").slice(0, 4).join(" ")}"`,
  ];

  for (const q of attempts) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=5&printType=books`;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.items?.length) continue;

      // Prefer: has ISBN-10, English language, not a study guide / summary
      const badKeywords = /study guide|summary of|workbook|companion|annotated|cliff|sparknotes|analysis of/i;
      const candidates = data.items.filter((item) => {
        const info = item.volumeInfo;
        if (!info) return false;
        const ids = info.industryIdentifiers || [];
        const hasIsbn10 = ids.some((i) => i.type === "ISBN_10" && !isGermanIsbn(i.identifier));
        const hasIsbn13 = ids.some((i) => i.type === "ISBN_13" && !isGermanIsbn(i.identifier));
        if (!hasIsbn10 && !hasIsbn13) return false;
        if (badKeywords.test(info.title || "")) return false;
        // Prefer English
        if (info.language && info.language !== "en") return false;
        return true;
      });

      if (candidates.length > 0) {
        return candidates[0].volumeInfo;
      }
    } catch (_) { /* continue */ }
    await sleep(400);
  }
  return null;
}

function getIsbn(volumeInfo) {
  const ids = volumeInfo?.industryIdentifiers || [];
  const isbn10 = ids.find((i) => i.type === "ISBN_10" && !isGermanIsbn(i.identifier))?.identifier;
  const isbn13 = ids.find((i) => i.type === "ISBN_13" && !isGermanIsbn(i.identifier))?.identifier;
  return { isbn10: isbn10 || null, isbn13: isbn13 || null };
}

function buildCoverUrl(isbn10, isbn13) {
  const code = isbn10 || isbn13;
  return code ? `https://covers.openlibrary.org/b/isbn/${code}-L.jpg` : null;
}

function buildCoverFallback(isbn10, isbn13) {
  const code = isbn10 || isbn13;
  return code ? `https://images-na.ssl-images-amazon.com/images/P/${code}.01._SX500_.jpg` : null;
}

function cleanDescription(text) {
  if (!text) return "";
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("\n");
}

async function main() {
  const booksData    = JSON.parse(readFileSync(BOOKS_JSON, "utf-8"));
  const deletedSlugs = new Set(JSON.parse(readFileSync(DELETED_JSON, "utf-8")));
  const existingSlugs = new Set(booksData.books.map((b) => b.slug));
  const existingAsins = new Set(booksData.books.map((b) => b.asin).filter(Boolean));

  console.log(`\n📚 Skriuwer Book Seeder — Pass 2`);
  console.log(`   Existing: ${booksData.books.length}  Deleted: ${deletedSlugs.size}  To try: ${SEED.length}`);
  console.log(`   Mode: ${SAVE ? "SAVE" : "DRY RUN"}\n`);

  const added = [];

  for (let i = 0; i < SEED.length; i++) {
    const [query, categories, reviewCount, starRating] = SEED[i];
    process.stdout.write(`  [${String(i + 1).padStart(3)}/${SEED.length}] ${query.slice(0, 52).padEnd(52)} `);

    if (i > 0 && i % 8 === 0) await sleep(2500);
    else await sleep(400);

    const info = await fetchGoogleBooks(query);
    if (!info) { console.log("✗ not found"); continue; }

    const title  = info.title || query;
    const author = (info.authors || ["Unknown Author"]).join(", ");
    const { isbn10, isbn13 } = getIsbn(info);
    const asin = isbn10 || isbn13;

    if (!asin) { console.log("✗ no valid ISBN"); continue; }
    if (asin.startsWith("B0")) { console.log("✗ Kindle"); continue; }
    if (isGermanIsbn(asin)) { console.log(`✗ German edition (${asin})`); continue; }

    const slug = slugify(`${title} ${author.split(",")[0].split(" ").pop()}`);

    if (deletedSlugs.has(slug) || existingSlugs.has(slug)) { console.log("✗ exists/deleted"); continue; }
    if (existingAsins.has(asin)) { console.log("✗ ASIN dup"); continue; }

    const book = {
      slug,
      asin,
      title: info.title || title,
      description: cleanDescription(info.description) || `<p>${info.title} by ${author}.</p>`,
      author,
      coverImage: buildCoverUrl(isbn10, isbn13) || "",
      coverImageFallback: buildCoverFallback(isbn10, isbn13),
      categories,
      tags: ["In English"],
      language: "en",
      pages: info.pageCount || null,
      price: null,
      currency: "USD",
      reviewCount,
      starRating,
      marketplaces: {
        "amazon.com":   `https://www.amazon.com/dp/${asin}`,
        "amazon.de":    `https://www.amazon.de/dp/${asin}`,
        "amazon.co.uk": `https://www.amazon.co.uk/dp/${asin}`,
        "amazon.nl":    `https://www.amazon.nl/dp/${asin}`,
        "amazon.fr":    `https://www.amazon.fr/dp/${asin}`,
      },
      isOwnBook: false,
      hookText: null,
      publishedDate: info.publishedDate || null,
    };

    added.push(book);
    existingSlugs.add(slug);
    existingAsins.add(asin);
    console.log(`✓  ${asin}  "${info.title?.slice(0, 38)}"`);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Added: ${added.length}  Total: ${booksData.books.length + added.length}`);

  if (!SAVE) { console.log("\nDry run — add --save to write.\n"); return; }

  booksData.books.push(...added);
  writeFileSync(BOOKS_JSON, JSON.stringify(booksData, null, 2), "utf-8");
  console.log(`\n✅ Saved ${added.length} books to data/books.json\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
