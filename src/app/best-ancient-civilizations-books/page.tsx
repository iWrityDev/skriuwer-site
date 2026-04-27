import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books on Ancient Civilizations in 2026",
  description:
    "The best books on ancient civilizations, Greece, Rome, Egypt, and more. Ranked by reader reviews, covering the history, culture, and legacy of the world's earliest great empires.",
  alternates: { canonical: "https://www.skriuwer.com/best-ancient-civilizations-books" },
  openGraph: {
    title: "Best Books on Ancient Civilizations in 2026",
    description: "The best books on ancient civilizations, Greece, Rome, Egypt, and more. Ranked by reader reviews, covering the history, culture, and legacy of the world's earliest great empires.",
    url: "https://www.skriuwer.com/best-ancient-civilizations-books",
    type: "website",
  },
};

export default function BestAncientCivilizationsBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      if (!b.categories.includes("history")) return false;
      const titleLower = b.title.toLowerCase();
      return (
        titleLower.includes("ancient") ||
        titleLower.includes("roman") ||
        titleLower.includes("greek") ||
        titleLower.includes("egypt")
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books on Ancient Civilizations in 2026"
      description="Ancient Greece, Rome, and Egypt gave us philosophy, law, architecture, and some of history's most compelling stories. These are the best books on ancient civilizations, ranked by reader reviews, essential reading for anyone fascinated by the origins of the world we live in today."
      books={books}
      breadcrumb="Best Books on Ancient Civilizations"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-ancient-civilizations-books"
    />
  );
}
