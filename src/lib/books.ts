import booksData from "../../data/books.json";
import type { Book } from "./types";

// Exclude Kindle-only editions (B0* ASINs) — site shows paperbacks only
const books: Book[] = (booksData.books as unknown as Book[]).filter(
  (b) => !b.asin || !b.asin.startsWith("B0")
);

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBooksByCategory(category: string): Book[] {
  return books
    .filter((b) => b.categories.includes(category))
    .sort((a, b) => b.reviewCount - a.reviewCount);
}

export function getFeaturedBooks(limit = 12): Book[] {
  return books
    .filter((b) => b.isOwnBook && b.coverImage && b.coverImage.startsWith("http"))
    .slice(0, limit);
}

export function getBestsellers(limit = 20): Book[] {
  return books
    .filter((b) => b.reviewCount > 0)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getRelatedBooks(book: Book, limit = 6): Book[] {
  return books
    .filter(
      (b) =>
        b.slug !== book.slug &&
        b.categories.some((c) => book.categories.includes(c))
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return books.map((b) => b.slug);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  books.forEach((b) => b.categories.forEach((c) => cats.add(c)));
  return Array.from(cats).sort();
}

export function getBookCount(): number {
  return books.length;
}

export function getRecentlyAdded(limit = 4): Book[] {
  // Return the last `limit` books that have a cover image and some reviews
  const eligible = books
    .filter((b) => b.coverImage && b.coverImage.startsWith("http") && b.reviewCount > 10)
    .slice(-limit * 6); // Look at a wider range to find good ones
  return eligible.slice(-limit).reverse();
}

export function getBookCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  books.forEach((b) => {
    b.categories.forEach((c) => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  return counts;
}

export function getRelatedBooksForBlog(categories: string[], limit = 4): Book[] {
  if (categories && categories.length > 0) {
    const matched = books
      .filter((b) => b.categories.some((c) => categories.includes(c)))
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
    if (matched.length > 0) return matched;
  }
  // Fallback: top bestsellers overall
  return books
    .filter((b) => b.reviewCount > 0)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
