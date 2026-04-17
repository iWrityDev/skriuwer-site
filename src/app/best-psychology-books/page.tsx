import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Psychology Books in 2026 | Top Reads on the Human Mind",
  description:
    "Discover the best psychology books ranked by reader reviews. From behavioural science to cognitive psychology, these books reveal what drives human thought and action.",
  alternates: { canonical: "https://skriuwer.com/best-psychology-books" },
};

export default function BestPsychologyBooksPage() {
  const books = ((booksData.books as unknown) as Book[])
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("psychology") ||
        /psychology|behaviour|behavioral|mindset|cognitive/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Psychology Books"
      description="Psychology books unlock the hidden forces behind every decision, emotion, and relationship. These are the best-rated books on the human mind, ranked by readers who found them genuinely illuminating."
      books={books}
      breadcrumb="Best Psychology Books"
      categoryPage="/category/psychology"
      categoryLabel="psychology"
      canonical="https://skriuwer.com/best-psychology-books"
    />
  );
}
