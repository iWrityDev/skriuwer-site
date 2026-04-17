import type { Metadata } from "next";
import booksData from "../../../data/books.json";
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books About Ancient Rome in 2026 | Top Roman History Picks",
  description:
    "The best books about Ancient Rome ranked by reader reviews. From Julius Caesar and the Republic to the fall of the Empire, these are the essential reads for Roman history fans.",
  alternates: { canonical: "https://skriuwer.com/best-ancient-rome-books" },
};

export default function BestAncientRomeBooksPage() {
  const books = ((booksData.books as unknown) as Book[])
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /\brome\b|\broman\b|caesar|gladiator|legion|colosseum|republic\b.*rome|senate.*rome|emperor.*rome|julius|augustus|nero|caligula|hadrian|marcus aurelius|seneca|cicero/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books About Ancient Rome"
      description="Ancient Rome built the most enduring empire in history and gave us laws, roads, and language that still shape our world today. These are the best books about Ancient Rome, from the Republic's rise to the Empire's fall, ranked by history enthusiasts who love the eternal city."
      books={books}
      breadcrumb="Best Ancient Rome Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-ancient-rome-books"
    />
  );
}
