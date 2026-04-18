import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best True Crime Books in 2026 | Top Reads on Real Murders & Heists",
  description:
    "The best true crime books ranked by reader reviews. From serial killers to unsolved heists and shocking cults, these gripping accounts of real events will keep you up at night.",
  alternates: { canonical: "https://skriuwer.com/best-true-crime-books" },
};

export default function BestTrueCrimeBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("true-crime") ||
        /true crime|serial killer|murder|criminal/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best True Crime Books"
      description="True crime books turn real-world horror into compulsive reading — the kind you finish in a single sitting. These are the most gripping accounts of murders, heists, cults, and criminal masterminds, ranked by readers who couldn't put them down."
      books={books}
      breadcrumb="Best True Crime Books"
      categoryPage="/category/true-crime"
      categoryLabel="true crime"
      canonical="https://skriuwer.com/best-true-crime-books"
    />
  );
}
