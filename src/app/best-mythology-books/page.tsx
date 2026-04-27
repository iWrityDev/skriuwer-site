import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Mythology Books in 2026, Gods, Heroes & Ancient Legends",
  description:
    "The best mythology books ranked by reader reviews. Greek, Norse, Egyptian mythology and beyond, ancient stories that explain everything about human nature. Editor-reviewed picks.",
  alternates: { canonical: "https://www.skriuwer.com/best-mythology-books" },
  openGraph: {
    title: "Best Mythology Books in 2026, Gods, Heroes & Ancient Legends",
    description: "The best mythology books ranked by reader reviews. Greek, Norse, Egyptian mythology and beyond, ancient stories that explain everything about human nature. Editor-reviewed picks.",
    url: "https://www.skriuwer.com/best-mythology-books",
    type: "website",
  },
};

const INTRO = [
  "Mythology is not primitive superstition. It is the most sophisticated technology humans ever invented for making sense of the universe, stories that encode truths about love, death, power, justice, and the chaos of existence that no scientific paper has yet surpassed in terms of raw explanatory power. The Greek myths are 2,500 years old and they still describe your boss, your relationships, and your inner critic with frightening accuracy.",
  "The books below cover the full range of world mythology: Greek pantheons, Norse sagas, Egyptian creation stories, and comparative mythology that draws the threads together. They range from accessible introductions ideal for beginners to deep dives that will satisfy readers who already know their Odyssey from their Iliad. All are ranked by real reader reviews and reviewed by our team.",
];

const FAQ = [
  {
    q: "What mythology books are best for complete beginners?",
    a: "For beginners, look for books with 'introduction,' 'for beginners,' or 'complete guide' in the title, these are written to require no prior knowledge. Books with high review counts and ratings above 4.5 stars are also reliable for beginners because they've been tested by the widest range of readers.",
  },
  {
    q: "Is Norse mythology or Greek mythology easier to start with?",
    a: "Greek mythology is generally easier to start with because more of it has been retold and adapted in modern culture, you likely already know some of it from films, games, and literature. Norse mythology has fewer well-known stories and a more complex cosmology, but it's just as rewarding once you're in. Our recommendation: start with Greek, then move to Norse.",
  },
  {
    q: "Are there mythology books for adults that aren't just reference books?",
    a: "Yes, many. The best mythology books for adults tell the myths as dramatic narratives, not as dry encyclopedias. Look for titles that describe themselves as 'retelling,' 'narrative,' or 'illustrated guide.' These read more like story collections than textbooks, and they're the ones most people actually finish and enjoy.",
  },
  {
    q: "Can mythology books help me understand modern literature and art?",
    a: "Absolutely. Most of Western literature, art, and political language is built on mythological references. Reading one good mythology book means you'll catch dozens of literary and artistic allusions you'd otherwise miss. It's one of the most rewarding reads for anyone who cares about culture.",
  },
];

export default function BestMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Mythology Books in 2026"
      description="Gods, heroes, monsters, and creation stories. These are the best mythology books available today, Greek, Norse, Egyptian, and world mythology, ranked by thousands of reader reviews."
      books={books}
      breadcrumb="Best Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://www.skriuwer.com/best-mythology-books"
      reviewer="Yahia Fathy & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
