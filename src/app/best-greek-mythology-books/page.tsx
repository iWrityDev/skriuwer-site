import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Greek Mythology Books in 2026",
  description:
    "Discover the best Greek mythology books available today, ranked by reader reviews. From dark retellings to classic myth collections, these are the top picks for mythology lovers.",
  alternates: { canonical: "https://skriuwer.com/best-greek-mythology-books" },
};

export default function BestGreekMythologyBooksPage() {
  const books = ((booksData.books as unknown) as Book[])
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Greek Mythology Books in 2026"
      description="Greek mythology has fascinated readers for millennia — from the brutal gods of Olympus to the heroes who defied them. These are the best Greek mythology books available today, ranked by reader popularity. Whether you want the original dark myths or modern retellings, this list covers the full range."
      books={books}
      breadcrumb="Best Greek Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/best-greek-mythology-books"
    />
  );
}
