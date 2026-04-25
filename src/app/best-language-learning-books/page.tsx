import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Language Learning Books in 2026",
  description:
    "The best books for learning a new language, from bilingual short story collections to vocabulary guides. Ranked by reader reviews across dozens of language pairs.",
  alternates: { canonical: "https://www.skriuwer.com/best-language-learning-books" },
};

export default function BestLanguageLearningBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("language-learning"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Language Learning Books in 2026"
      description="The most effective way to learn a language is through reading. These are the best language learning books available today, bilingual stories, vocabulary guides, and parallel-text collections that make it possible to absorb a new language at your own pace. All ranked by reader reviews."
      books={books}
      breadcrumb="Best Language Learning Books"
      categoryPage="/category/language-learning"
      categoryLabel="language learning"
      canonical="https://www.skriuwer.com/best-language-learning-books"
    />
  );
}
