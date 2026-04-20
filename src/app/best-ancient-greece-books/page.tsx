import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books About Ancient Greece in 2026 | Top Greek History Picks",
  description:
    "The best books about Ancient Greece ranked by reader reviews. From Socrates and Plato to the Trojan War and Alexander the Great, discover the essential reads for Greek history fans.",
  alternates: { canonical: "https://skriuwer.com/best-ancient-greece-books" },
};

export default function BestAncientGreeceBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /\bgreece\b|\bgreek\b|athens|sparta|socrates|plato|aristotle|alexander|pericles|thucydides|herodotus|acropolis|parthenon|olympia|peloponnesian|marathon\b|thermopylae|agora/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books About Ancient Greece"
      description="Ancient Greece gave us democracy, philosophy, drama, and the Olympic Games. These are the best books about Ancient Greece, from the city-states of Athens and Sparta to the conquests of Alexander the Great, ranked by readers passionate about the birthplace of Western civilization."
      books={books}
      breadcrumb="Best Ancient Greece Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-ancient-greece-books"
    />
  );
}
