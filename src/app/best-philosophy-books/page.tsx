import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Philosophy Books in 2026 | Top Reads from Plato to Nietzsche",
  description:
    "The best philosophy books ranked by reader reviews. From ancient Stoics to modern existentialists, these essential works will challenge how you think about life, meaning, and ethics.",
  alternates: { canonical: "https://skriuwer.com/best-philosophy-books" },
};

export default function BestPhilosophyBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("philosophy") ||
        /philosophy|stoic|stoicism|plato|aristotle|nietzsche/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Philosophy Books"
      description="Philosophy asks the questions that every other discipline tries to avoid. These are the best-rated philosophy books — from Plato's dialogues to Nietzsche's provocations — ranked by readers who found them genuinely thought-changing."
      books={books}
      breadcrumb="Best Philosophy Books"
      categoryPage="/category/philosophy"
      categoryLabel="philosophy"
      canonical="https://skriuwer.com/best-philosophy-books"
    />
  );
}
