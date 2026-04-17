import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Biographies to Read in 2026 | Top Memoirs & Life Stories",
  description:
    "The best biographies and memoirs ranked by reader reviews. Remarkable true stories of world leaders, artists, explorers, and ordinary people who lived extraordinary lives.",
  alternates: { canonical: "https://skriuwer.com/best-biography-books" },
};

export default function BestBiographyBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("biography") ||
        /biography|memoir|autobiography/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Biographies to Read"
      description="A great biography puts you inside the mind of someone who shaped the world. These are the most celebrated biographies and memoirs ranked by reader reviews — covering leaders, artists, athletes, and survivors."
      books={books}
      breadcrumb="Best Biographies to Read"
      categoryPage="/category/biography"
      categoryLabel="biography & memoir"
      canonical="https://skriuwer.com/best-biography-books"
    />
  );
}
