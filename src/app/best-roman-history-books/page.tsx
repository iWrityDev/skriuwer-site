import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Roman History Books in 2026",
  description:
    "The best books on Roman history, from the Republic to the fall of the Empire. Ranked by reader reviews, these titles cover everything from Julius Caesar to the legions that shaped Western civilization.",
  alternates: { canonical: "https://www.skriuwer.com/best-roman-history-books" },
  openGraph: {
    title: "Best Roman History Books in 2026",
    description: "The best books on Roman history, from the Republic to the fall of the Empire. Ranked by reader reviews, these titles cover everything from Julius Caesar to the legions that shaped Western civilization.",
    url: "https://www.skriuwer.com/best-roman-history-books",
    type: "website",
  },
};

export default function BestRomanHistoryBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      if (!b.categories.includes("history")) return false;
      const combined = `${b.title} ${b.description}`.toLowerCase();
      return combined.includes("roman") || combined.includes("rome");
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Roman History Books in 2026"
      description="Rome built an empire that lasted centuries and left its mark on law, language, and culture across the Western world. These are the best Roman history books ranked by reader reviews, covering the Republic, the Caesars, the legions, and the eventual fall of the greatest empire in antiquity."
      books={books}
      breadcrumb="Best Roman History Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-roman-history-books"
    />
  );
}
