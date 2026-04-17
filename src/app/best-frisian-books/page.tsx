import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Frisian Books in 2026",
  description:
    "The best books for learning and exploring the Frisian language — one of Europe's oldest and most fascinating minority languages. From beginner guides to bilingual readers.",
  alternates: { canonical: "https://skriuwer.com/best-frisian-books" },
};

export default function BestFrisianBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => {
      const combined = `${b.title} ${b.description}`.toLowerCase();
      return combined.includes("frisian") || combined.includes("fries");
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Frisian Books in 2026"
      description="Frisian is one of the closest living relatives to English and one of Europe's most endangered minority languages. These are the best Frisian books available — from language learning guides to bilingual readers — perfect for anyone wanting to connect with this remarkable linguistic heritage."
      books={books}
      breadcrumb="Best Frisian Books"
      categoryPage="/category/language-learning"
      categoryLabel="language learning"
      canonical="https://skriuwer.com/best-frisian-books"
    />
  );
}
