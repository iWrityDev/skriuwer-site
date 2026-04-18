/**
 * seed_books.mjs — Seeds books.json with curated bestsellers via Google Books API.
 *
 * Usage:
 *   node scripts/seed_books.mjs          # dry run (print only)
 *   node scripts/seed_books.mjs --save   # write to data/books.json
 *
 * - Fetches real metadata (title, author, description, ISBN) from Google Books API
 * - Uses Open Library for high-quality cover images (HTTPS, 400px+)
 * - Falls back to Amazon CDN cover if Open Library is missing
 * - Skips books already in books.json or deleted_slugs.json
 * - Sets isOwnBook: false for all seeded books
 * - OneLink tag (31813-20) is added at render time by BuyButton — not stored here
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_JSON   = join(__dirname, "../data/books.json");
const DELETED_JSON = join(__dirname, "../data/deleted_slugs.json");
const SAVE = process.argv.includes("--save");

// ── Curated seed list ─────────────────────────────────────────────────────────
// [searchQuery, categories[], approxReviewCount, approxStarRating]
const SEED = [
  // ── HISTORY (general) ──────────────────────────────────────────────────────
  ["Sapiens A Brief History of Humankind Yuval Noah Harari", ["history"], 110000, 4.5],
  ["Homo Deus A Brief History of Tomorrow Yuval Noah Harari", ["history", "science"], 32000, 4.4],
  ["Guns Germs and Steel Jared Diamond", ["history"], 19000, 4.6],
  ["The Silk Roads A New History Peter Frankopan", ["history"], 14000, 4.4],
  ["A Short History of Nearly Everything Bill Bryson", ["history", "science"], 17000, 4.7],
  ["Sapiens A Graphic History Yuval Noah Harari", ["history"], 8000, 4.5],
  ["The Lessons of History Will Durant Ariel Durant", ["history", "philosophy"], 6500, 4.6],
  ["Killers of the Flower Moon David Grann", ["history", "dark-history"], 48000, 4.7],
  ["The Warmth of Other Suns Isabel Wilkerson", ["history"], 22000, 4.8],
  ["The Devil in the White City Erik Larson", ["history", "true-crime"], 55000, 4.6],

  // ── ANCIENT ROME ───────────────────────────────────────────────────────────
  ["SPQR A History of Ancient Rome Mary Beard", ["history"], 9500, 4.4],
  ["Rubicon The Last Years of the Roman Republic Tom Holland", ["history"], 10000, 4.6],
  ["Dynasty The Rise and Fall of the House of Caesar Tom Holland", ["history"], 6000, 4.5],
  ["The Storm Before the Storm Mike Duncan", ["history"], 4500, 4.6],
  ["Caesar Life of a Colossus Adrian Goldsworthy", ["history"], 3200, 4.5],
  ["How Rome Fell Death of a Superpower Adrian Goldsworthy", ["history"], 2200, 4.4],
  ["Pompeii A Novel Robert Harris", ["history", "fiction"], 12000, 4.4],
  ["Rubicon Tom Holland", ["history"], 8000, 4.6],

  // ── VIKINGS ────────────────────────────────────────────────────────────────
  ["Children of Ash and Elm A History of the Vikings Neil Price", ["history"], 5000, 4.6],
  ["The Vikings A History Robert Ferguson", ["history"], 2200, 4.4],
  ["The Age of the Vikings Anders Winroth", ["history"], 1100, 4.4],
  ["The Sea Wolves A History of the Vikings Lars Brownworth", ["history"], 3500, 4.5],
  ["Vikings at War Kim Hjardar Vegard Vike", ["history"], 900, 4.4],

  // ── WORLD WAR II ───────────────────────────────────────────────────────────
  ["Unbroken A World War II Story Laura Hillenbrand", ["history", "dark-history", "biography"], 95000, 4.8],
  ["Band of Brothers Stephen Ambrose", ["history", "dark-history"], 24000, 4.7],
  ["The Diary of a Young Girl Anne Frank", ["history", "dark-history", "biography"], 62000, 4.8],
  ["Night Elie Wiesel", ["history", "dark-history", "biography"], 72000, 4.7],
  ["D-Day June 6 1944 Stephen Ambrose", ["history", "dark-history"], 8500, 4.7],
  ["The Hiding Place Corrie ten Boom", ["history", "dark-history", "religion", "biography"], 45000, 4.8],
  ["Killing Patton Bill O'Reilly Martin Dugard", ["history", "biography"], 12000, 4.6],

  // ── ANCIENT EGYPT ─────────────────────────────────────────────────────────
  ["The Rise and Fall of Ancient Egypt Toby Wilkinson", ["history"], 2800, 4.4],
  ["Egyptian Mythology A Guide to the Gods Geraldine Pinch", ["history", "mythology"], 1400, 4.3],
  ["The Complete Gods and Goddesses of Ancient Egypt Richard Wilkinson", ["history", "mythology"], 2100, 4.6],
  ["Tutankhamun The Untold Story Thomas Hoving", ["history"], 1200, 4.4],
  ["The Egyptian Book of the Dead E.A. Wallis Budge", ["history", "mythology", "religion"], 5500, 4.4],

  // ── MYTHOLOGY (general) ────────────────────────────────────────────────────
  ["Mythology Edith Hamilton", ["mythology"], 21000, 4.6],
  ["The Power of Myth Joseph Campbell Bill Moyers", ["mythology", "religion", "philosophy"], 14000, 4.6],
  ["The Hero with a Thousand Faces Joseph Campbell", ["mythology", "philosophy"], 10500, 4.5],
  ["World Mythology The Illustrated Guide Roy Willis", ["mythology"], 1800, 4.4],
  ["The Encyclopedia of World Mythology Arthur Cotterell", ["mythology"], 1500, 4.3],

  // ── NORSE MYTHOLOGY ────────────────────────────────────────────────────────
  ["Norse Mythology Neil Gaiman", ["mythology"], 38000, 4.7],
  ["The Prose Edda Tales from Norse Mythology Snorri Sturluson", ["mythology"], 4200, 4.5],
  ["Norse Myths From Odin to Ragnarok Kevin Crossley-Holland", ["mythology"], 1100, 4.3],
  ["The Norse Myths Carolyne Larrington", ["mythology"], 900, 4.3],

  // ── GREEK MYTHOLOGY ────────────────────────────────────────────────────────
  ["Mythos The Greek Myths Retold Stephen Fry", ["mythology"], 58000, 4.7],
  ["Heroes Mortals and Monsters Stephen Fry", ["mythology"], 31000, 4.6],
  ["Troy Stephen Fry", ["mythology"], 22000, 4.6],
  ["The Iliad Homer Robert Fagles", ["mythology", "history"], 14000, 4.5],
  ["The Odyssey Homer Robert Fagles", ["mythology", "history"], 17000, 4.6],
  ["The Greek Myths Robert Graves", ["mythology"], 6000, 4.5],
  ["Circe Madeline Miller", ["mythology", "fiction"], 180000, 4.7],
  ["The Song of Achilles Madeline Miller", ["mythology", "fiction"], 220000, 4.8],

  // ── EGYPTIAN MYTHOLOGY ─────────────────────────────────────────────────────
  ["Egyptian Mythology Gods of Ancient Egypt", ["mythology"], 1200, 4.3],
  ["The Mists of Ra Egyptian Mythology", ["mythology", "history"], 900, 4.2],

  // ── CONSPIRACY ─────────────────────────────────────────────────────────────
  ["The Creature from Jekyll Island G Edward Griffin", ["conspiracy", "history"], 16000, 4.7],
  ["Behold a Pale Horse Milton William Cooper", ["conspiracy"], 13000, 4.5],
  ["None Dare Call It Conspiracy Gary Allen", ["conspiracy", "history"], 4500, 4.4],
  ["The Deep State Jason Chaffetz", ["conspiracy"], 3200, 4.4],
  ["Bloodlines of the Illuminati Fritz Springmeier", ["conspiracy"], 5500, 4.4],
  ["The Secret History of the World Jonathan Black", ["conspiracy", "history"], 4100, 4.2],
  ["Tragedy and Hope Carroll Quigley", ["conspiracy", "history"], 2800, 4.5],

  // ── DARK HISTORY ───────────────────────────────────────────────────────────
  ["The Rape of Nanking Iris Chang", ["dark-history", "history"], 5000, 4.7],
  ["Ordinary Men Christopher Browning", ["dark-history", "history"], 4200, 4.6],
  ["Hitler's Willing Executioners Daniel Goldhagen", ["dark-history", "history"], 3800, 4.2],
  ["The Anatomy of Fascism Robert Paxton", ["dark-history", "history"], 2600, 4.5],
  ["In Cold Blood Truman Capote", ["dark-history", "true-crime"], 55000, 4.6],
  ["Columbine Dave Cullen", ["dark-history", "true-crime"], 18000, 4.7],

  // ── RELIGION & SPIRITUALITY ────────────────────────────────────────────────
  ["Mere Christianity C.S. Lewis", ["religion"], 55000, 4.8],
  ["The Purpose Driven Life Rick Warren", ["religion", "self-help"], 20000, 4.7],
  ["Man's Search for Meaning Viktor Frankl", ["religion", "psychology", "self-help"], 95000, 4.7],
  ["The Case for Christ Lee Strobel", ["religion"], 22000, 4.7],
  ["Surprised by Joy C.S. Lewis", ["religion", "biography"], 12000, 4.7],
  ["The Screwtape Letters C.S. Lewis", ["religion", "philosophy"], 36000, 4.7],
  ["Jesus and the Eyewitnesses Richard Bauckham", ["religion", "history"], 3800, 4.6],

  // ── SCIENCE & NATURE ───────────────────────────────────────────────────────
  ["A Brief History of Time Stephen Hawking", ["science"], 27000, 4.5],
  ["The Selfish Gene Richard Dawkins", ["science"], 11000, 4.5],
  ["Cosmos Carl Sagan", ["science"], 13000, 4.7],
  ["Astrophysics for People in a Hurry Neil deGrasse Tyson", ["science"], 33000, 4.6],
  ["The Grand Design Stephen Hawking Leonard Mlodinow", ["science", "philosophy"], 8500, 4.3],
  ["A Universe from Nothing Lawrence Krauss", ["science", "philosophy"], 7500, 4.4],
  ["The Code Book Simon Singh", ["science", "history"], 9000, 4.7],
  ["Sapiens A Brief History of Humankind Yuval Harari science", ["history", "science"], 110000, 4.5],
  ["The Gene An Intimate History Siddhartha Mukherjee", ["science"], 12000, 4.6],
  ["Why We Sleep Matthew Walker", ["science", "self-help"], 55000, 4.5],

  // ── LANGUAGE LEARNING ─────────────────────────────────────────────────────
  ["Fluent Forever Gabriel Wyner", ["language-learning"], 9000, 4.3],
  ["The Language Instinct Steven Pinker", ["language-learning", "science"], 5000, 4.5],
  ["How to Learn Any Language Barry Farber", ["language-learning"], 2200, 4.3],
  ["Babel Around the World in Twenty Languages Gaston Dorren", ["language-learning", "history"], 2800, 4.4],
  ["Through the Language Glass Guy Deutscher", ["language-learning", "science"], 3500, 4.4],
  ["In Other Words Jhumpa Lahiri", ["language-learning", "biography"], 6000, 4.3],

  // ── SELF-HELP ──────────────────────────────────────────────────────────────
  ["Atomic Habits James Clear", ["self-help"], 155000, 4.8],
  ["The 7 Habits of Highly Effective People Stephen Covey", ["self-help"], 58000, 4.7],
  ["How to Win Friends and Influence People Dale Carnegie", ["self-help"], 90000, 4.7],
  ["Mindset The New Psychology of Success Carol Dweck", ["self-help", "psychology"], 42000, 4.7],
  ["The Power of Now Eckhart Tolle", ["self-help", "religion", "philosophy"], 70000, 4.6],
  ["Think and Grow Rich Napoleon Hill", ["self-help"], 62000, 4.6],
  ["Can't Hurt Me David Goggins", ["self-help", "biography"], 125000, 4.8],
  ["The Subtle Art of Not Giving a F*ck Mark Manson", ["self-help"], 185000, 4.5],
  ["Extreme Ownership Jocko Willink Leif Babin", ["self-help"], 55000, 4.7],
  ["Deep Work Cal Newport", ["self-help"], 48000, 4.6],

  // ── BIOGRAPHY ─────────────────────────────────────────────────────────────
  ["Leonardo da Vinci Walter Isaacson", ["biography", "history"], 28000, 4.7],
  ["Steve Jobs Walter Isaacson", ["biography"], 52000, 4.6],
  ["The Wright Brothers David McCullough", ["biography", "history"], 22000, 4.7],
  ["Alexander Hamilton Ron Chernow", ["biography", "history"], 16000, 4.7],
  ["Educated Tara Westover", ["biography"], 195000, 4.7],
  ["Wild Cheryl Strayed", ["biography"], 110000, 4.5],

  // ── PHILOSOPHY ────────────────────────────────────────────────────────────
  ["Meditations Marcus Aurelius", ["philosophy", "history"], 75000, 4.7],
  ["The Republic Plato", ["philosophy", "history"], 22000, 4.4],
  ["Thus Spoke Zarathustra Friedrich Nietzsche", ["philosophy"], 18000, 4.4],
  ["The Philosophy Book DK", ["philosophy"], 14000, 4.6],
  ["Stoicism and the Art of Happiness Donald Robertson", ["philosophy", "self-help"], 8000, 4.5],
  ["The Daily Stoic Ryan Holiday", ["philosophy", "self-help"], 65000, 4.7],

  // ── PSYCHOLOGY ────────────────────────────────────────────────────────────
  ["Thinking Fast and Slow Daniel Kahneman", ["psychology"], 65000, 4.5],
  ["The Body Keeps the Score Bessel van der Kolk", ["psychology", "science"], 90000, 4.7],
  ["Influence The Psychology of Persuasion Robert Cialdini", ["psychology"], 52000, 4.6],
  ["12 Rules for Life Jordan Peterson", ["psychology", "philosophy", "self-help"], 85000, 4.6],
  ["Behave The Biology of Humans Robert Sapolsky", ["psychology", "science"], 14000, 4.6],

  // ── TRUE CRIME ────────────────────────────────────────────────────────────
  ["I'll Be Gone in the Dark Michelle McNamara", ["true-crime"], 65000, 4.7],
  ["Mindhunter John Douglas Mark Olshaker", ["true-crime"], 38000, 4.7],
  ["The Monster of Florence Douglas Preston Mario Spezi", ["true-crime"], 12000, 4.5],
  ["Helter Skelter Vincent Bugliosi Curt Gentry", ["true-crime", "dark-history"], 25000, 4.6],

  // ── FRISIAN ───────────────────────────────────────────────────────────────
  ["The Frisians History Culture People", ["frisian", "history"], 400, 4.3],
  ["Frisian Language Grammar Guide", ["frisian", "language-learning"], 300, 4.1],
];

// ── Helpers ──────────────────────────────────────────────────────────────────

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

async function fetchGoogleBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3&printType=books&langRestrict=en`;
  try {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.items?.length) return null;
    // Prefer items that have ISBNs
    const withIsbn = data.items.find(item =>
      item.volumeInfo?.industryIdentifiers?.some(i => i.type === "ISBN_10" || i.type === "ISBN_13")
    );
    return (withIsbn || data.items[0]).volumeInfo;
  } catch (e) {
    return null;
  }
}

function getIsbn(volumeInfo) {
  const ids = volumeInfo?.industryIdentifiers || [];
  const isbn10 = ids.find((i) => i.type === "ISBN_10")?.identifier;
  const isbn13 = ids.find((i) => i.type === "ISBN_13")?.identifier;
  return { isbn10: isbn10 || null, isbn13: isbn13 || null };
}

function buildCoverUrl(isbn10, isbn13) {
  const code = isbn10 || isbn13;
  if (!code) return null;
  // Open Library large cover (400px+)
  return `https://covers.openlibrary.org/b/isbn/${code}-L.jpg`;
}

function buildCoverFallback(isbn10, isbn13) {
  const code = isbn10 || isbn13;
  if (!code) return null;
  // Amazon CDN fallback (500px)
  return `https://images-na.ssl-images-amazon.com/images/P/${code}.01._SX500_.jpg`;
}

function buildMarketplaces(asin) {
  return {
    "amazon.com":    `https://www.amazon.com/dp/${asin}`,
    "amazon.de":     `https://www.amazon.de/dp/${asin}`,
    "amazon.co.uk":  `https://www.amazon.co.uk/dp/${asin}`,
    "amazon.nl":     `https://www.amazon.nl/dp/${asin}`,
    "amazon.fr":     `https://www.amazon.fr/dp/${asin}`,
  };
}

function cleanDescription(text) {
  if (!text) return "";
  // Wrap plain-text paragraphs in <p> tags
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("\n");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const booksData    = JSON.parse(readFileSync(BOOKS_JSON, "utf-8"));
  const deletedSlugs = new Set(JSON.parse(readFileSync(DELETED_JSON, "utf-8")));

  const existingSlugs  = new Set(booksData.books.map((b) => b.slug));
  const existingAsins  = new Set(booksData.books.map((b) => b.asin).filter(Boolean));

  console.log(`\n📚 Skriuwer Book Seeder`);
  console.log(`   Existing books : ${booksData.books.length}`);
  console.log(`   Deleted slugs  : ${deletedSlugs.size}`);
  console.log(`   Books to try   : ${SEED.length}`);
  console.log(`   Mode           : ${SAVE ? "SAVE" : "DRY RUN"}\n`);

  const added = [];
  const skipped = [];

  for (let i = 0; i < SEED.length; i++) {
    const [query, categories, reviewCount, starRating] = SEED[i];

    process.stdout.write(`  [${String(i + 1).padStart(3)}/${SEED.length}] ${query.slice(0, 55).padEnd(55)} `);

    // Small delay to be polite to Google Books API
    if (i > 0 && i % 10 === 0) await sleep(2000);
    else await sleep(300);

    const info = await fetchGoogleBooks(query);
    if (!info) {
      console.log("✗ not found");
      skipped.push({ query, reason: "not found in Google Books" });
      continue;
    }

    const title  = info.title || query;
    const author = (info.authors || ["Unknown Author"]).join(", ");
    const { isbn10, isbn13 } = getIsbn(info);
    const asin = isbn10 || isbn13;

    if (!asin) {
      console.log("✗ no ISBN");
      skipped.push({ query, reason: "no ISBN" });
      continue;
    }

    // Skip Kindle ASINs
    if (asin.startsWith("B0")) {
      console.log("✗ Kindle ASIN");
      skipped.push({ query, reason: "Kindle ASIN" });
      continue;
    }

    const slug = slugify(`${title} ${author.split(",")[0].split(" ").pop()}`);

    if (deletedSlugs.has(slug)) {
      console.log("✗ deleted");
      skipped.push({ query, reason: "in deleted_slugs" });
      continue;
    }
    if (existingSlugs.has(slug)) {
      console.log("✗ exists");
      skipped.push({ query, reason: "slug already exists" });
      continue;
    }
    if (existingAsins.has(asin)) {
      console.log("✗ ASIN dup");
      skipped.push({ query, reason: "ASIN already in catalog" });
      continue;
    }

    const coverImage    = buildCoverUrl(isbn10, isbn13);
    const coverFallback = buildCoverFallback(isbn10, isbn13);
    const description   = cleanDescription(info.description);
    const pages         = info.pageCount || null;
    const published     = info.publishedDate || null;

    const book = {
      slug,
      asin,
      title: info.title || title,
      description: description || `<p>${info.title} by ${author} — one of the most acclaimed books in its field.</p>`,
      author,
      coverImage: coverImage || "",
      coverImageFallback: coverFallback,
      categories,
      tags: ["In English"],
      language: "en",
      pages,
      price: null,
      currency: "USD",
      reviewCount,
      starRating,
      marketplaces: buildMarketplaces(asin),
      isOwnBook: false,
      hookText: null,
      publishedDate: published,
    };

    added.push(book);
    existingSlugs.add(slug);
    existingAsins.add(asin);
    console.log(`✓  ${asin}  [${categories[0]}]  ${info.title?.slice(0, 35)}`);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Added  : ${added.length}`);
  console.log(`  Skipped: ${skipped.length}`);
  console.log(`  Total  : ${booksData.books.length + added.length}`);

  if (!SAVE) {
    console.log(`\nDry run complete — add --save to write changes.\n`);
    return;
  }

  booksData.books.push(...added);
  writeFileSync(BOOKS_JSON, JSON.stringify(booksData, null, 2), "utf-8");
  console.log(`\n✅ Saved ${added.length} new books to data/books.json\n`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
