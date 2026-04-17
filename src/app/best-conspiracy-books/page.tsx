import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Conspiracy Books in 2026 | Top Picks for Truth Seekers",
  description:
    "The best conspiracy books ranked by reader reviews. Explore hidden histories, government cover-ups, and the dark underbelly of power — from ancient conspiracies to modern cover-ups.",
  alternates: { canonical: "https://skriuwer.com/best-conspiracy-books" },
};

export default function BestConspiracyBooksPage() {
  const books = ((booksData.books as unknown) as Book[])
    .filter((b) => b.categories.includes("conspiracy"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Conspiracy Books in 2026"
      description="From ancient power struggles to modern cover-ups, conspiracy books reveal the hidden forces that shape history. These are the best conspiracy books available today — ranked by reader popularity. Whether you're a skeptic or a true believer, these books will make you question everything."
      books={books}
      breadcrumb="Best Conspiracy Books"
      categoryPage="/category/conspiracy"
      categoryLabel="conspiracy"
      canonical="https://skriuwer.com/best-conspiracy-books"
    />
  );
}
