import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Gifts for Mythology Fans, Greek, Norse & World Mythology Books",
  description:
    "The best mythology books to give as gifts in 2026. Greek gods, Norse sagas, Egyptian myths, perfect for fans of ancient stories, fantasy, and world culture.",
  alternates: { canonical: "https://skriuwer.com/gift-guides/mythology-fans" },
};

const INTRO = [
  "Mythology fans are some of the most enthusiastic readers in the world, and they're also notoriously picky about what they'll actually read. The books on this list have been chosen because they work equally well as introduction texts for newcomers and as deep dives for people who already know their Trojan War from their Ragnarök.",
  "We've included books across Greek, Norse, Egyptian, and world mythology to give you options regardless of what tradition the recipient is most drawn to. Every book is available on Amazon, most under $18.",
];

export default function GiftMythologyFansPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 12);

  return (
    <BestOfPage
      title="Best Gifts for Mythology Fans"
      description="The best mythology books as gifts, Greek, Norse, Egyptian, and world mythology. Accessible for beginners, rich enough for enthusiasts, all available on Amazon."
      books={books}
      breadcrumb="Mythology Fan Gifts"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://skriuwer.com/gift-guides/mythology-fans"
      reviewer="Yahia Fathy & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      showComparison
    />
  );
}
