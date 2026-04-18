import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Business Books in 2026 | Top Books on Finance & Entrepreneurship",
  description:
    "The best business books ranked by reader reviews. Whether you want to start a company, invest smarter, or lead better, these are the titles serious professionals recommend.",
  alternates: { canonical: "https://skriuwer.com/best-business-books" },
};

export default function BestBusinessBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("business") ||
        /business|investing|entrepreneur|leadership|finance/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Business Books"
      description="The best business books don't just teach tactics — they change how you see markets, money, and people. These are the top-rated titles on entrepreneurship, investing, leadership, and finance, ranked by the readers who applied them."
      books={books}
      breadcrumb="Best Business Books"
      categoryPage="/category/business"
      categoryLabel="business & finance"
      canonical="https://skriuwer.com/best-business-books"
    />
  );
}
