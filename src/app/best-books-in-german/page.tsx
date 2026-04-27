import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books in German 2026 – Top German Books Ranked by Readers",
  description:
    "The best German-language books available today, ranked by reader reviews. History, bilingual stories, dark history, and more — all written or translated into German.",
  alternates: { canonical: "https://www.skriuwer.com/best-books-in-german" },
  openGraph: {
    title: "Best Books in German 2026 – Top German Books Ranked by Readers",
    description:
      "The best German-language books available today, ranked by reader reviews. History, bilingual stories, dark history, and more — all written or translated into German.",
    url: "https://www.skriuwer.com/best-books-in-german",
    type: "website",
  },
};

const INTRO = [
  "Ob Sie Deutsch als Muttersprache sprechen oder es als Fremdsprache lernen: Die deutschsprachigen Bücher auf dieser Seite decken Geschichte, dunkle Geschichte, zweisprachige Kurzgeschichten und mehr ab. Alle Titel sind auf Amazon erhältlich und wurden von echten Lesern bewertet.",
  "Whether you are a native German speaker or learning the language, this page collects the strongest German-language titles across every category — from narrative history and dark history to bilingual parallel-text books designed for language learners. Each book is ranked by verified Amazon reader reviews.",
];

const FAQ = [
  {
    q: "Welche deutschen Bücher sind die beliebtesten bei Lesern?",
    a: "Deutschsprachige Sachbücher über Geschichte, dunkle Geschichte und Überlebensgeschichten sind besonders gefragt. Die Bücher auf dieser Seite sind nach Leserbewertungen auf Amazon sortiert — je mehr Bewertungen, desto bewährter das Buch.",
  },
  {
    q: "Are these German books available outside Germany?",
    a: "Yes. All books link to Amazon, which ships internationally. The buy links on individual book pages route to Amazon DE, NL, UK, and US so you can choose the best option for your location.",
  },
  {
    q: "Gibt es zweisprachige Bücher auf Deutsch?",
    a: "Ja. Diese Seite enthält eine große Auswahl an zweisprachigen Kurzgeschichten für Deutschsprachige, die eine neue Sprache lernen wollen — darunter Deutsch-Russisch, Deutsch-Englisch, Deutsch-Türkisch und viele mehr.",
  },
  {
    q: "Which categories are available in German?",
    a: "History, dark history, language learning (bilingual stories), and survival non-fiction are the strongest German-language categories on this site. More German titles are added regularly.",
  },
  {
    q: "Sind die Bücher auch als Kindle-Version erhältlich?",
    a: "Die meisten Titel sind sowohl als Taschenbuch als auch als Kindle-E-Book bei Amazon erhältlich. Die Links auf den jeweiligen Buchseiten führen Sie direkt zur passenden Edition.",
  },
];

export default function BestBooksInGermanPage() {
  const books = getAllBooks()
    .filter((b) => b.language === "de")
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Best Books in German 2026"
      description="The strongest German-language titles available today — history, dark history, bilingual stories, and more. Ranked by reader reviews on Amazon."
      books={books}
      breadcrumb="Best Books in German"
      categoryPage="/category/language-learning"
      categoryLabel="language-learning"
      canonical="https://www.skriuwer.com/best-books-in-german"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
