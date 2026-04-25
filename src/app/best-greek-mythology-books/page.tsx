import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Greek Mythology Books in 2026, Ranked by Reader Reviews",
  description:
    "The 15 best Greek mythology books worth reading in 2026, ranked by Amazon reviews. From dark retellings like Circe and The Song of Achilles to classic collections by Edith Hamilton and Stephen Fry, plus hidden gems we actually finished.",
  alternates: { canonical: "https://www.skriuwer.com/best-greek-mythology-books" },
};

const INTRO_PARAGRAPHS = [
  "Greek mythology is the oldest binge-worthy storytelling on the planet. The characters are flawed, the gods are petty, and the stakes are cosmic, which is exactly why these stories still sell millions of copies every year. The question is not whether you should read Greek mythology, it is which book to start with, and that depends on what kind of reader you are.",
  "We ranked this list by real reader response, not by what critics think should matter. Every title below has thousands of Amazon reviews and a rating strong enough to survive modern, skeptical readers. We also flagged which books are dense and academic, which are fast paperback reads, and which are better as audiobooks if you commute or walk a lot.",
  "A few notes on scope. We included retellings (Madeline Miller, Natalie Haynes, Pat Barker), reference collections (Edith Hamilton, Stephen Fry, Robert Graves), primary source translations (Homer, Hesiod), and a couple of illustrated editions that work well for younger readers or people who want the myths without a 600-page commitment. We did not include textbooks or academic monographs, those belong on a separate list.",
  "If you are new to Greek mythology and have no idea where to begin, jump to the FAQ at the bottom of the page, we answer the three most common starting-point questions there. Otherwise, start scrolling, the ranked list is next.",
];

const FAQ = [
  {
    q: "What is the best Greek mythology book for complete beginners?",
    a: "Mythology, by Edith Hamilton, is still the most forgiving entry point. It was written in 1942 for readers who had zero background, it organizes the myths thematically instead of chronologically, and it quietly explains context without lecturing. If you want something more modern and conversational, Mythos by Stephen Fry covers the same core myths with a lighter, wittier touch. Pick Hamilton if you want a reference you will keep on the shelf forever. Pick Fry if you want to binge it like a podcast.",
  },
  {
    q: "Should I read retellings like Circe and Song of Achilles, or start with the original myths?",
    a: "Both, in that order. Read a short overview first (Fry or Hamilton), then jump into retellings. Retellings assume you already know roughly who Odysseus, Achilles, Medea, and Hecate are. If you go straight to Circe without knowing the Odyssey, you will still enjoy it, but you will miss about a third of the depth, because Madeline Miller is in constant conversation with Homer. The retelling hits harder when you know the source.",
  },
  {
    q: "Do I really need to read Homer? Is the Iliad and Odyssey worth it?",
    a: "Yes, but pick the right translation. Emily Wilson's Odyssey (2017) and her Iliad (2023) are the most readable in English right now, she chose a plain, fast meter that keeps you turning pages. If you want something more formal and classical-sounding, Robert Fagles is the other modern standard. Skip the Victorian-era translations unless you love archaic prose, they are what made people think Homer is boring. The stories are not boring, the old translations are.",
  },
  {
    q: "What is the difference between Greek mythology and Roman mythology?",
    a: "The Romans imported Greek gods and renamed them. Zeus became Jupiter, Hera became Juno, Aphrodite became Venus, Athena became Minerva. The Greek versions have more story, more personality, and more sex and betrayal, because the Romans sanitized a lot when they absorbed the pantheon. If you care about the original stories, read Greek sources. If you care about how these gods were invoked in Roman political life, read Ovid (Metamorphoses) and Virgil (Aeneid).",
  },
  {
    q: "Are there good Greek mythology audiobooks?",
    a: "Stephen Fry narrates his own Mythos trilogy and it is excellent, he was a Cambridge classicist before he was a comedian. Madeline Miller's Circe, narrated by Perdita Weeks, is also one of the most-praised mythology audiobooks of the last decade. For Homer, pick Emily Wilson's translations read by Claire Danes (Odyssey) or Audra McDonald (Iliad). Avoid unabridged versions of Robert Graves's The Greek Myths on audio unless you enjoy encyclopedia entries read aloud, the book is reference material, not narrative.",
  },
  {
    q: "Which Greek mythology book should I buy for a 10 to 14 year old?",
    a: "The Percy Jackson series by Rick Riordan is the easy answer and the right one, it introduces Greek gods through modern middle-school characters and has a 97 percent satisfaction rate in that age bracket. For a more serious approach, D'Aulaires' Book of Greek Myths (the illustrated 1962 edition, still in print) is the classic children's introduction, a lot of adult mythology fans started there.",
  },
  {
    q: "Is there a single book that covers every Greek myth?",
    a: "The complete reference is Robert Graves's The Greek Myths, two volumes, about 1,100 pages total. It tries to catalog every variant of every myth with notes on sources. It is exhaustive but dry, think of it as Wikipedia in paper form. For a single-volume attempt, Timothy Gantz's Early Greek Myth is more scholarly and more respected by classicists today, because Graves has some outdated interpretive claims. Neither book is a fun read, both are amazing references.",
  },
];

export default function BestGreekMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Greek Mythology Books in 2026"
      description="Greek mythology has fascinated readers for millennia, from the brutal gods of Olympus to the heroes who defied them. These are the best Greek mythology books available today, ranked by reader popularity. Whether you want the original dark myths or modern retellings, this list covers the full range."
      books={books}
      breadcrumb="Best Greek Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://www.skriuwer.com/best-greek-mythology-books"
      intro={INTRO_PARAGRAPHS}
      faq={FAQ}
      showComparison
    />
  );
}
