import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books for History Lovers in 2026 | Top History Reads Ranked",
  description:
    "The best books for history lovers, ranked by reader reviews. From ancient civilisations and world wars to dark historical secrets, these are the essential reads for every history enthusiast.",
  alternates: { canonical: "https://skriuwer.com/best-books-for-history-lovers" },
};

export default function BestBooksForHistoryLoversPage() {
  const books = (booksData.books as Book[])
    .filter(
      (b) =>
        b.categories.includes("history") || b.categories.includes("dark-history")
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books for History Lovers"
      description="History lovers know that the past is never as simple as textbooks suggest — it is messier, stranger, and far more gripping. These are the top-rated history books across all eras and topics, ranked by readers who couldn't stop at just one."
      books={books}
      breadcrumb="Best Books for History Lovers"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-books-for-history-lovers"
    />
  );
}
