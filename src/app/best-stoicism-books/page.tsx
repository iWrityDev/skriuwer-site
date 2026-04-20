import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books on Stoicism in 2026 | Top Reads on Stoic Philosophy",
  description:
    "The best Stoicism books ranked by reader reviews. From Marcus Aurelius and Seneca to modern guides on Stoic living, these are the essential reads for anyone drawn to ancient wisdom.",
  alternates: { canonical: "https://skriuwer.com/best-stoicism-books" },
};

export default function BestStoicismBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return /stoic|stoicism|marcus aurelius|seneca|epictetus/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books on Stoicism"
      description="Stoicism has experienced a remarkable revival because its core ideas, focus on what you control, accept what you cannot, act with virtue, are as practical today as they were in ancient Rome. These are the best Stoicism books, from the original texts to modern interpretations, ranked by readers who live by them."
      books={books}
      breadcrumb="Best Books on Stoicism"
      categoryPage="/category/philosophy"
      categoryLabel="philosophy"
      canonical="https://skriuwer.com/best-stoicism-books"
    />
  );
}
