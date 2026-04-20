import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books About Ancient Egypt in 2026 | Top Picks for Egypt Fans",
  description:
    "The best books about Ancient Egypt ranked by reader reviews. From the pharaohs and pyramids to Egyptian mythology and daily life, discover the top picks for Egypt enthusiasts.",
  alternates: { canonical: "https://skriuwer.com/best-ancient-egypt-books" },
};

export default function BestAncientEgyptBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /egypt|pharaoh|pyramid|nile|hieroglyph|mummy|sphinx|cleopatra|osiris|isis|ra\b|anubis|tutankhamun|ramesses/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books About Ancient Egypt"
      description="Ancient Egypt built wonders that still defy explanation, the pyramids, the Sphinx, and a civilization that lasted 3,000 years. These are the best books about Ancient Egypt, covering everything from the pharaohs and gods to daily life along the Nile, ranked by passionate readers."
      books={books}
      breadcrumb="Best Ancient Egypt Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-ancient-egypt-books"
    />
  );
}
