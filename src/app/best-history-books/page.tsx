import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best History Books in 2026",
  description:
    "The best history books available today, ranked by reader reviews. Covering ancient civilizations, wars, empires, and the events that shaped the modern world.",
  alternates: { canonical: "https://skriuwer.com/best-history-books" },
};

export default function BestHistoryBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best History Books in 2026"
      description="History is full of stories more dramatic, strange, and consequential than any fiction. These are the best history books available today — from ancient civilizations to modern conflicts — ranked by the readers who rate them most highly. Whether you're new to history or a seasoned reader, this list has something for you."
      books={books}
      breadcrumb="Best History Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-history-books"
    />
  );
}
