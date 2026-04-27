import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Dark History Books in 2026 | True Stories of Horror & Brutality",
  description:
    "The best dark history books ranked by reader reviews. Uncover the gruesome, brutal, and disturbing facts from history that mainstream textbooks leave out.",
  alternates: { canonical: "https://www.skriuwer.com/best-dark-history-books" },
  openGraph: {
    title: "Best Dark History Books in 2026 | True Stories of Horror & Brutality",
    description: "The best dark history books ranked by reader reviews. Uncover the gruesome, brutal, and disturbing facts from history that mainstream textbooks leave out.",
    url: "https://www.skriuwer.com/best-dark-history-books",
    type: "website",
  },
};

export default function BestDarkHistoryBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("dark-history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Dark History Books"
      description="History is far darker than any textbook will ever admit. These are the best dark history books, unflinching accounts of atrocities, cover-ups, and the brutal realities of the past, ranked by readers who wanted the full truth."
      books={books}
      breadcrumb="Best Dark History Books"
      categoryPage="/category/dark-history"
      categoryLabel="dark history"
      canonical="https://www.skriuwer.com/best-dark-history-books"
    />
  );
}
