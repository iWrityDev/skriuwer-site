import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Mythology Books of All Time",
  description:
    "The best mythology books of all time — Greek, Norse, Roman, and beyond. Ranked by reader reviews, covering origin myths, god pantheons, hero legends, and dark folklore.",
  alternates: { canonical: "https://skriuwer.com/best-mythology-books" },
};

export default function BestMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Mythology Books of All Time"
      description="Mythology is humanity's oldest storytelling tradition — tales of gods, monsters, heroes, and the forces that shape existence itself. These are the best mythology books of all time, drawn from Greek, Norse, Roman, and other traditions, ranked by the readers who love them most."
      books={books}
      breadcrumb="Best Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/best-mythology-books"
    />
  );
}
