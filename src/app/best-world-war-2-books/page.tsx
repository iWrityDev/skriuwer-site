import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best World War 2 Books — Top Picks for 2026",
  description: "The best books about World War II, ranked by reader reviews. From battles and strategy to personal memoirs, these titles bring the war to life.",
  alternates: { canonical: "https://skriuwer.com/best-world-war-2-books" },
};

export default function BestWW2BooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) =>
      b.categories.includes("history") &&
      (b.title.toLowerCase().includes("world war") ||
        b.title.toLowerCase().includes("ww2") ||
        b.title.toLowerCase().includes("wwii") ||
        b.title.toLowerCase().includes("nazi") ||
        b.title.toLowerCase().includes("hitler") ||
        b.title.toLowerCase().includes("churchill") ||
        (b.tags && b.tags.some((t) => t.includes("world war") || t.includes("ww2"))))
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  // Fallback: top history books if we don't have enough WW2-specific books
  const finalBooks = books.length >= 3 ? books : (booksData.books as Book[])
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best World War 2 Books in 2026"
      description="World War II was the defining event of the 20th century — a conflict that reshaped the entire world. These are the best WW2 books available today, from gripping battlefield accounts to psychological profiles of Nazi leadership, ranked by readers who have lived with these stories. Whether you want the big picture or the intimate personal account, this list has it."
      books={finalBooks}
      breadcrumb="Best WW2 Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-world-war-2-books"
    />
  );
}
