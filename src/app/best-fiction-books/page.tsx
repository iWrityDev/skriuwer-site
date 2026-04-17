import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Fiction Books of All Time | Top Novels Ranked by Readers",
  description:
    "The best fiction books of all time ranked by reader reviews. From literary classics to gripping thrillers, these are the novels readers return to again and again.",
  alternates: { canonical: "https://skriuwer.com/best-fiction-books" },
};

export default function BestFictionBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => b.categories.includes("fiction"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Fiction Books of All Time"
      description="Great fiction doesn't just tell a story — it changes how you see the world. These are the best fiction books ranked by reader popularity, spanning literary novels, psychological thrillers, and genre-defining classics."
      books={books}
      breadcrumb="Best Fiction Books of All Time"
      categoryPage="/category/fiction"
      categoryLabel="fiction"
      canonical="https://skriuwer.com/best-fiction-books"
    />
  );
}
