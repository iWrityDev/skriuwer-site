import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Mindset Books, Books That Will Change How You Think",
  description: "The best books on mindset, growth, and mental strength, ranked by reader reviews. These titles will rewire how you think and push you forward.",
  alternates: { canonical: "https://skriuwer.com/best-mindset-books" },
};

export default function BestMindsetBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("self-help") || b.categories.includes("psychology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Mindset Books in 2026"
      description="Your mindset determines almost everything, your success, your happiness, your resilience. These are the best books on mindset and mental strength available today, ranked by the readers who credit them with genuine life change. From Carol Dweck's growth mindset to the Stoic philosophers, these titles will rewire how you think about challenges, failure, and success."
      books={books}
      breadcrumb="Best Mindset Books"
      categoryPage="/category/self-help"
      categoryLabel="self-help"
      canonical="https://skriuwer.com/best-mindset-books"
    />
  );
}
