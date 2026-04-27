import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Mythologie-Bücher 2026 – Griechisch, Nordisch, Ägyptisch",
  description:
    "Die besten Bücher über Mythologie: griechische Götter, nordische Krieger, ägyptische Legenden. Alle nach verifizierten Amazon-Leserbewertungen sortiert.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-mythologie-buecher",
    languages: {
      en: "https://www.skriuwer.com/best-mythology-books",
      de: "https://www.skriuwer.com/de/beste-mythologie-buecher",
    },
  },
  openGraph: {
    title: "Beste Mythologie-Bücher 2026 – Griechisch, Nordisch, Ägyptisch",
    description:
      "Die besten Bücher über Mythologie: griechische Götter, nordische Krieger, ägyptische Legenden.",
    url: "https://www.skriuwer.com/de/beste-mythologie-buecher",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Mythen sind keine alten Märchen. Sie sind die erste Art, wie Menschen versuchten, Macht, Tod, Gerechtigkeit und das Unerklärliche zu begreifen. Wer die Mythen einer Kultur versteht, versteht etwas Grundlegendes darüber, wie diese Menschen die Welt sahen.",
  "Diese Seite versammelt die meistgelesenen Bücher über Mythologie: griechisch, nordisch, ägyptisch, keltisch und darüber hinaus. Sortiert nach verifizierten Leserbewertungen auf Amazon, damit die Bücher ganz oben stehen, die tatsächlich begeistern.",
];

const FAQ = [
  {
    q: "Was ist der Unterschied zwischen griechischer und nordischer Mythologie?",
    a: "Griechische Mythologie dreht sich um Götter des Olymp (Zeus, Athene, Apollon) und Helden wie Achilles und Odysseus. Nordische Mythologie umfasst Odin, Thor und Loki sowie das Weltende Ragnarök. Beide Traditionen sind faszinierend, aber die nordische Mythologie wirkt düsterer und fatalistischer: Die Götter selbst werden sterben.",
  },
  {
    q: "Wo fange ich an, wenn ich noch nie etwas über Mythologie gelesen habe?",
    a: "Beginnen Sie mit einer modernen Nacherzählung, bevor Sie zu Primärquellen wie Homers Ilias oder der Edda greifen. Bücher wie Neil Gaimans Nacherzählungen sind ein idealer Einstieg, packend geschrieben und trotzdem inhaltlich solide.",
  },
  {
    q: "Gibt es Mythologie-Bücher speziell für Kinder oder Jugendliche?",
    a: "Ja. Viele der auf Amazon am häufigsten bewerteten Mythologie-Bücher sind für ein jugendliches Publikum geschrieben. Die Percy-Jackson-Reihe z.B. hat Millionen junger Leser zur griechischen Mythologie geführt, auch wenn sie Fiktion ist.",
  },
  {
    q: "Sind diese Bücher akademisch oder eher unterhaltend?",
    a: "Beides ist vertreten. Diese Liste priorisiert leserfreundliche Sachbücher, die trotzdem inhaltlich korrekt sind. Für akademische Lektüre gibt es zusätzliche Empfehlungen auf den einzelnen Buchseiten.",
  },
  {
    q: "Welche Mythologie-Bücher gibt es auf Deutsch?",
    a: "Viele der beliebtesten Titel sind als deutsche Übersetzung erhältlich. Auf der Seite 'Beste Bücher auf Deutsch' finden Sie speziell deutschsprachige Ausgaben.",
  },
];

export default function BesteMythologieBuecher() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Mythologie-Bücher 2026"
      description="Von Zeus bis Odin: die meistgelesenen und bestbewerteten Bücher über Mythologie auf Amazon, sortiert nach Leserbewertungen."
      books={books}
      breadcrumb="Beste Mythologie-Bücher"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/de/beste-mythologie-buecher"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
