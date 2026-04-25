import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books of 2026 | Top Rated Books Right Now",
  description:
    "The best books of 2026 ranked by reader reviews. The most popular and highly rated titles across all genres, history, mythology, self-help, fiction, and more.",
  alternates: { canonical: "https://www.skriuwer.com/best-books-2026" },
};

export default function BestBooks2026Page() {
  const books = getAllBooks()
    .filter((b) => b.reviewCount > 100)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books of 2026"
      description="These are the books readers can't stop talking about in 2026, titles with hundreds of reviews and ratings that prove they deliver. Whether you love history, mythology, fiction, or personal development, this list has something worth reading next."
      books={books}
      breadcrumb="Best Books of 2026"
      categoryPage="/bestsellers"
      categoryLabel="bestseller"
      canonical="https://www.skriuwer.com/best-books-2026"
    />
  );
}
