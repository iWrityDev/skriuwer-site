import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Viking Books in 2026 | Top Picks for Norse History Fans",
  description:
    "The best Viking books ranked by reader reviews. From Norse mythology and Viking raids to longships and the sagas, discover the top picks for Viking and Norse history fans.",
  alternates: { canonical: "https://skriuwer.com/best-viking-books" },
};

export default function BestVikingBooksPage() {
  const books = (booksData.books as Book[])
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /viking|norse|scandinavia|odin|thor|valhalla|ragnarok|longship|northmen|norsemen|fjord|saga|skald/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Viking Books"
      description="The Vikings were more than raiders — they were explorers, traders, craftsmen, and poets who shaped medieval Europe. These are the best Viking books, covering Norse history, mythology, and the legendary sagas, ranked by readers obsessed with the Norse world."
      books={books}
      breadcrumb="Best Viking Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/best-viking-books"
    />
  );
}
