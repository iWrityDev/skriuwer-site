import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Bücher auf Deutsch 2026 – Top-Titel nach Leserbewertungen",
  description:
    "Die besten deutschsprachigen Bücher aus allen Genres — Geschichte, Mythologie, Sprachlernen, dunkle Geschichte und mehr. Nach Amazon-Bewertungen sortiert.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-buecher-auf-deutsch",
    languages: {
      en: "https://www.skriuwer.com/best-books-in-german",
      de: "https://www.skriuwer.com/de/beste-buecher-auf-deutsch",
    },
  },
  openGraph: {
    title: "Beste Bücher auf Deutsch 2026 – Top-Titel nach Leserbewertungen",
    description:
      "Die besten deutschsprachigen Bücher aus allen Genres — Geschichte, Mythologie, Sprachlernen, dunkle Geschichte und mehr.",
    url: "https://www.skriuwer.com/de/beste-buecher-auf-deutsch",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Diese Seite versammelt die beliebtesten Bücher, die auf Deutsch erschienen sind — egal ob als Originalwerk oder als Übersetzung. Sachbücher über Geschichte und dunkle Geschichte, zweisprachige Kurzgeschichten für Sprachenlernende sowie Titel aus Mythologie und Verschwörungstheorien.",
  "Alle Bücher sind nach der Anzahl der verifizierten Leserbewertungen auf Amazon sortiert. Das bedeutet: oben stehen die Bücher, die am meisten Menschen tatsächlich gelesen und bewertet haben — nicht die mit dem höchsten Werbebudget.",
];

const FAQ = [
  {
    q: "Welche deutschen Bücher sind bei Lesern am beliebtesten?",
    a: "Deutschsprachige Sachbücher über Geschichte, dunkle Geschichte und Überlebensgeschichten sind besonders gefragt. Auf dieser Seite werden Bücher nach Anzahl der Amazon-Bewertungen sortiert — je mehr Bewertungen, desto bewährter das Buch.",
  },
  {
    q: "Gibt es zweisprachige Bücher auf Deutsch?",
    a: "Ja, diese Seite enthält eine Auswahl an zweisprachigen Kurzgeschichten für Deutschsprachige, die eine neue Sprache lernen möchten — darunter Deutsch-Englisch, Deutsch-Russisch, Deutsch-Türkisch und weitere.",
  },
  {
    q: "Sind diese Bücher außerhalb Deutschlands erhältlich?",
    a: "Ja. Alle Bücher verlinken zu Amazon, das international liefert. Die Links auf den einzelnen Buchseiten führen zu Amazon DE, NL, UK und US — wählen Sie den Shop, der für Ihren Standort am besten geeignet ist.",
  },
  {
    q: "Welche Kategorien sind auf Deutsch verfügbar?",
    a: "Geschichte, dunkle Geschichte, Sprachlernen (zweisprachige Geschichten) und True Crime sind die stärksten deutschsprachigen Kategorien auf dieser Seite. Weitere Titel werden regelmäßig hinzugefügt.",
  },
  {
    q: "Sind die Bücher auch als Kindle-Version erhältlich?",
    a: "Die meisten Titel sind sowohl als Taschenbuch als auch als Kindle-E-Book bei Amazon erhältlich. Die Links auf den jeweiligen Buchseiten führen Sie direkt zur passenden Edition.",
  },
];

export default function BesteBuecherAufDeutsch() {
  const books = getAllBooks()
    .filter((b) => b.language === "de")
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Bücher auf Deutsch 2026"
      description="Die stärksten deutschsprachigen Titel — Geschichte, dunkle Geschichte, zweisprachige Geschichten und mehr. Nach Leserbewertungen auf Amazon sortiert."
      books={books}
      breadcrumb="Beste Bücher auf Deutsch"
      categoryPage="/category/language-learning"
      categoryLabel="Sprachlernen"
      canonical="https://www.skriuwer.com/de/beste-buecher-auf-deutsch"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
