import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Egyptian Mythology Books in 2026 | Top Reads on Ancient Egypt",
  description:
    "The best Egyptian mythology books ranked by reader reviews. Discover the gods, pharaohs, and sacred rituals of ancient Egypt, from Osiris and Ra to the mysteries of the pyramids.",
  alternates: { canonical: "https://skriuwer.com/best-egyptian-mythology-books" },
};

export default function BestEgyptianMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return /egypt|egyptian|pharaoh|pyramid|osiris|\bra\b/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Egyptian Mythology Books"
      description="Ancient Egypt produced one of history's most fascinating and elaborate mythological systems, gods with animal heads, afterlife judgements, and cosmic battles that shaped a civilisation for three thousand years. These are the best Egyptian mythology books, ranked by reader reviews."
      books={books}
      breadcrumb="Best Egyptian Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/best-egyptian-mythology-books"
    />
  );
}
