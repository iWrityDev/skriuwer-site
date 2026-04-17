import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Norse Mythology Books in 2026 | Top Reads on Vikings & Norse Gods",
  description:
    "The best Norse mythology books ranked by reader reviews. From Odin and Thor to Valhalla and the Vikings, these are the essential reads for fans of Norse legends.",
  alternates: { canonical: "https://skriuwer.com/best-norse-mythology-books" },
};

export default function BestNorseMythologyBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return /norse|viking|odin|thor|valhalla/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Norse Mythology Books"
      description="Norse mythology is one of the richest and most dramatic traditions in world folklore — full of gods, monsters, and world-ending prophecies. These are the best books on Norse myths and the Vikings, ranked by readers who explored every saga."
      books={books}
      breadcrumb="Best Norse Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/best-norse-mythology-books"
    />
  );
}
