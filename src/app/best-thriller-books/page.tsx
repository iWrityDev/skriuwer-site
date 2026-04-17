import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Thriller Books — Page-Turning Reads for 2026",
  description: "The best thriller novels ranked by reader reviews. Heart-pounding suspense, twists you won't see coming, and characters you can't forget.",
  alternates: { canonical: "https://skriuwer.com/best-thriller-books" },
};

export default function BestThrillerBooksPage() {
  const books = ((booksData.books as unknown) as Book[])
    .filter((b) => b.categories.includes("fiction") || b.categories.includes("true-crime"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Thriller Books in 2026"
      description="The best thrillers keep you up all night — pages flying, heart racing, convinced you'll put it down after just one more chapter. These are the highest-rated thriller novels available today, ranked by the readers who couldn't sleep until they'd finished them. From psychological suspense to true-crime-inspired fiction, this list delivers pure reading pleasure."
      books={books}
      breadcrumb="Best Thriller Books"
      categoryPage="/category/fiction"
      categoryLabel="fiction"
      canonical="https://skriuwer.com/best-thriller-books"
    />
  );
}
