import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Bücher über nordische Mythologie 2026 – Odin, Thor, Ragnarök",
  description:
    "Die besten Bücher über nordische Mythologie: Wikinger, Götter, Weltuntergang. Für Einsteiger und Kenner. Nach verifizierten Amazon-Leserbewertungen sortiert.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-nordische-mythologie-buecher",
    languages: {
      en: "https://www.skriuwer.com/best-norse-mythology-books",
      de: "https://www.skriuwer.com/de/beste-nordische-mythologie-buecher",
    },
  },
  openGraph: {
    title: "Beste Bücher über nordische Mythologie 2026 – Odin, Thor, Ragnarök",
    description:
      "Die besten Bücher über nordische Mythologie: Wikinger, Götter, Weltuntergang.",
    url: "https://www.skriuwer.com/de/beste-nordische-mythologie-buecher",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Die nordische Mythologie ist düsterer als die griechische. Hier werden die Götter selbst sterben. Odin weiß es, bereitet sich vor, und kämpft trotzdem weiter. Diese Haltung (Mut angesichts des sicheren Endes) hat die Wikinger-Kultur geprägt und fasziniert bis heute Leser weltweit.",
  "Die Bücher auf dieser Seite decken das gesamte Spektrum ab: von wissenschaftlichen Texten über die originale Edda bis hin zu packenden modernen Nacherzählungen, die auch ohne Vorkenntnisse zugänglich sind.",
];

const FAQ = [
  {
    q: "Was ist die beste Einführung in die nordische Mythologie?",
    a: "Für Einsteiger empfehlen sich moderne Nacherzählungen, bevor man zur Prosa-Edda oder Lieder-Edda greift. Die Primärquellen setzen einiges Kontextwissen voraus. Die auf dieser Seite am höchsten bewerteten Bücher sind in der Regel die zugänglichsten.",
  },
  {
    q: "Was ist Ragnarök und warum ist es so wichtig?",
    a: "Ragnarök ist das Weltende in der nordischen Mythologie: eine finale Schlacht, in der fast alle Götter und Ungeheuer sterben. Was Ragnarök besonders macht: Es ist vorhergesagt, unvermeidlich, und die Götter bereiten sich trotzdem darauf vor. Diese Akzeptanz des Schicksals ist ein Kernthema nordischer Philosophie.",
  },
  {
    q: "Wie unterscheidet sich die nordische Mythologie von der Film-Version (Marvel)?",
    a: "Erheblich. Loki in der Edda ist kein heldenhafter Antiheld, sondern ein komplexer Trickster, der letztlich das Böse wählt. Thor ist weniger redegewandt und deutlich brutaler. Die Original-Götter haben mehr Tiefe und moralische Ambiguität als ihre Filmversionen.",
  },
  {
    q: "Gibt es nordische Mythologie-Bücher auf Deutsch?",
    a: "Ja. Sowohl Übersetzungen moderner Bücher als auch Ausgaben der originalen Edda sind auf Deutsch bei Amazon.de erhältlich. Überprüfen Sie die Verfügbarkeit auf den einzelnen Buchseiten.",
  },
  {
    q: "Was ist der Unterschied zwischen Prosa-Edda und Lieder-Edda?",
    a: "Die Prosa-Edda (geschrieben von Snorri Sturluson um 1220) erzählt die Mythen in Prosaform und ist zugänglicher. Die Lieder-Edda ist eine Sammlung alter Gedichte in altnordischer Sprache, die ältere und literarisch reichhaltigere Quelle, aber anspruchsvoller zu lesen.",
  },
];

export default function BesteNordischeMythologieBuecher() {
  const books = getAllBooks()
    .filter(
      (b) =>
        b.categories.includes("mythology") &&
        (b.title.toLowerCase().includes("norse") ||
          b.title.toLowerCase().includes("viking") ||
          b.title.toLowerCase().includes("odin") ||
          b.title.toLowerCase().includes("thor") ||
          b.title.toLowerCase().includes("nordic") ||
          b.description?.toLowerCase().includes("norse") ||
          b.description?.toLowerCase().includes("viking"))
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Beste Bücher über nordische Mythologie 2026"
      description="Die meistgelesenen Bücher über Wikinger, Götter und Ragnarök, von Einsteigerwerken bis zur originalen Edda. Nach Leserbewertungen auf Amazon sortiert."
      books={books}
      breadcrumb="Nordische Mythologie"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/de/beste-nordische-mythologie-buecher"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
