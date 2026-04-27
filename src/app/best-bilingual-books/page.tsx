import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Bilingual Books for Language Learners in 2026",
  description:
    "The best bilingual books for learning a new language. Side-by-side parallel text in dozens of language pairs, the natural, enjoyable way to build fluency.",
  alternates: { canonical: "https://www.skriuwer.com/best-bilingual-books" },
  openGraph: {
    title: "Best Bilingual Books for Language Learners in 2026",
    description: "The best bilingual books for learning a new language. Side-by-side parallel text in dozens of language pairs, the natural, enjoyable way to build fluency.",
    url: "https://www.skriuwer.com/best-bilingual-books",
    type: "website",
  },
};

export default function BestBilingualBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const titleLower = b.title.toLowerCase();
      return (
        titleLower.includes("bilingual") ||
        titleLower.includes("zweisprachige") ||
        titleLower.includes("bilingue")
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Bilingual Books for Language Learners in 2026"
      description="Bilingual books let you read in two languages simultaneously, absorbing vocabulary and grammar naturally through context rather than rote study. These are the best bilingual books for language learners, covering dozens of language pairs from French-English to German-Polish, ranked by reader reviews."
      books={books}
      breadcrumb="Best Bilingual Books for Language Learners"
      categoryPage="/category/language-learning"
      categoryLabel="language learning"
      canonical="https://www.skriuwer.com/best-bilingual-books"
    />
  );
}
