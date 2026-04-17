/**
 * One-time import script: converts Shopify products.json + master_products.json + hooks.json
 * into the unified data/books.json used by the site.
 *
 * Usage: npx tsx scripts/import-books.ts
 *
 * Source files expected at: C:\Users\aukeh\Downloads\skriuwer_pinterest\
 */

import fs from "fs";
import path from "path";

// --- Types ---

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  product_type: string;
  tags: string[];
  vendor: string;
  images: { src: string; width: number; height: number }[];
  variants: { price: string; title: string }[];
  url: string;
  amazon_url?: string;
  amazon_marketplace?: string;
  amazon_asin?: string;
  review_count?: number;
  star_rating?: number | null;
}

interface MasterProduct {
  asin: string;
  title: string;
  amazon_url: string;
  handle: string;
  images: { src: string; width: number; height: number }[];
  tags: string[];
  variants: { price: string; title: string }[];
  shopify_id: number | null;
  skriuwer_url: string | null;
  review_count: number;
  star_rating: number | null;
}

interface Hook {
  hook: string;
  quote: string;
  list_title: string;
  list_items: string[];
}

interface OutputBook {
  slug: string;
  asin: string | null;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  coverImageFallback: string | null;
  categories: string[];
  tags: string[];
  language: string;
  pages: number | null;
  price: string | null;
  currency: string;
  reviewCount: number;
  starRating: number | null;
  marketplaces: Record<string, string>;
  isOwnBook: boolean;
  hookText: string | null;
  publishedDate: string | null;
}

// --- Category classifier ---

const CATEGORY_RULES: { slug: string; keywords: string[] }[] = [
  { slug: "mythology", keywords: ["mythology", "myth", "legends", "gods", "norse", "greek"] },
  { slug: "dark-history", keywords: ["scary", "dark", "horror", "brutal", "gruesome"] },
  { slug: "language-learning", keywords: ["bilingual", "stories", "vocabulary", "kurzgeschichten", "zweisprachige", "short stories"] },
  { slug: "frisian", keywords: ["frisian", "frysk", "west frisian", "friesland"] },
  { slug: "history", keywords: ["history", "historical", "ancient", "civilization", "war", "empire"] },
  { slug: "conspiracy", keywords: ["conspiracy", "hidden", "secret", "cover-up", "controversial"] },
  { slug: "religion", keywords: ["bible", "religion", "spiritual", "church", "faith"] },
  { slug: "science", keywords: ["science", "nature", "technology", "physics", "biology", "dinosaur"] },
  { slug: "self-help", keywords: ["self-help", "motivation", "mindset", "productivity"] },
  { slug: "fiction", keywords: ["fiction", "novel", "story", "thriller", "romance"] },
];

function classifyBook(title: string, tags: string[], description: string): string[] {
  const text = `${title} ${tags.join(" ")} ${description}`.toLowerCase();
  const matched: string[] = [];

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      matched.push(rule.slug);
    }
  }

  return matched.length > 0 ? matched : ["general"];
}

function detectLanguage(tags: string[], title: string): string {
  const tagStr = tags.join(" ").toLowerCase();
  const titleLower = title.toLowerCase();

  if (tagStr.includes("german") || tagStr.includes("in german") || titleLower.includes("auf deutsch")) return "de";
  if (tagStr.includes("dutch") || titleLower.includes("op dutch")) return "nl";
  if (tagStr.includes("french") || titleLower.includes("en français")) return "fr";
  return "en";
}

function extractAsinFromUrl(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]+)/);
  return match ? match[1] : null;
}

function buildMarketplaces(asin: string): Record<string, string> {
  return {
    "amazon.com": `https://www.amazon.com/dp/${asin}`,
    "amazon.de": `https://www.amazon.de/dp/${asin}`,
    "amazon.co.uk": `https://www.amazon.co.uk/dp/${asin}`,
    "amazon.nl": `https://www.amazon.nl/dp/${asin}`,
  };
}

// --- Main ---

function main() {
  const sourceDir = "C:/Users/aukeh/Downloads/skriuwer_pinterest";
  const outputDir = path.join(__dirname, "..", "data");

  // Load source data
  const shopifyProducts: { products: ShopifyProduct[] } = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "products.json"), "utf-8")
  );

  const masterProducts: { products: MasterProduct[] } = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "master_products.json"), "utf-8")
  );

  const hooks: Record<string, Hook> = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "hooks.json"), "utf-8")
  );

  console.log(`Loaded: ${shopifyProducts.products.length} Shopify products`);
  console.log(`Loaded: ${masterProducts.products.length} master products`);
  console.log(`Loaded: ${Object.keys(hooks).length} hooks`);

  const outputBooks: OutputBook[] = [];
  const seenSlugs = new Set<string>();

  // 1. Process Shopify products (own books)
  shopifyProducts.products.forEach((prod, index) => {
    const asin = prod.amazon_asin || (prod.amazon_url ? extractAsinFromUrl(prod.amazon_url) : null);
    const slug = prod.handle;

    if (seenSlugs.has(slug)) return;
    seenSlugs.add(slug);

    const hookData = hooks[index.toString()];
    const categories = classifyBook(prod.title, prod.tags, prod.body_html);
    const language = detectLanguage(prod.tags, prod.title);

    outputBooks.push({
      slug,
      asin,
      title: prod.title,
      description: prod.body_html,
      author: prod.vendor || "Skriuwer.com",
      coverImage: prod.images[0]?.src || "",
      coverImageFallback: asin
        ? `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.L.jpg`
        : null,
      categories,
      tags: prod.tags,
      language,
      pages: null,
      price: prod.variants[0]?.price || null,
      currency: "USD",
      reviewCount: prod.review_count || 0,
      starRating: prod.star_rating || null,
      marketplaces: asin ? buildMarketplaces(asin) : {},
      isOwnBook: true,
      hookText: hookData?.hook || null,
      publishedDate: null,
    });
  });

  // 2. Process master products (Amazon-only books from other authors)
  masterProducts.products.forEach((prod, index) => {
    const slug = prod.handle;
    if (seenSlugs.has(slug)) {
      // Update existing entry with review data
      const existing = outputBooks.find((b) => b.slug === slug || b.asin === prod.asin);
      if (existing) {
        existing.reviewCount = Math.max(existing.reviewCount, prod.review_count);
        existing.starRating = prod.star_rating || existing.starRating;
      }
      return;
    }
    seenSlugs.add(slug);

    const hookData = hooks[index.toString()];
    const categories = classifyBook(prod.title, prod.tags, "");

    outputBooks.push({
      slug,
      asin: prod.asin,
      title: prod.title,
      description: "",  // Amazon-only books need descriptions from Google Books API later
      author: "Skriuwer.com",
      coverImage: prod.images[0]?.src || "",
      coverImageFallback: `https://images-na.ssl-images-amazon.com/images/P/${prod.asin}.01.L.jpg`,
      categories,
      tags: prod.tags,
      language: "en",
      pages: null,
      price: prod.variants[0]?.price || null,
      currency: "USD",
      reviewCount: prod.review_count,
      starRating: prod.star_rating,
      marketplaces: buildMarketplaces(prod.asin),
      isOwnBook: prod.shopify_id !== null,
      hookText: hookData?.hook || null,
      publishedDate: null,
    });
  });

  // Sort by review count (bestsellers first)
  outputBooks.sort((a, b) => b.reviewCount - a.reviewCount);

  // Write output
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "books.json"),
    JSON.stringify({ books: outputBooks }, null, 2)
  );

  console.log(`\nOutput: ${outputBooks.length} books written to data/books.json`);
  console.log(`  Own books: ${outputBooks.filter((b) => b.isOwnBook).length}`);
  console.log(`  Other books: ${outputBooks.filter((b) => !b.isOwnBook).length}`);
  console.log(`  With reviews: ${outputBooks.filter((b) => b.reviewCount > 0).length}`);
}

main();
