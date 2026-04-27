import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Geschichtsbücher 2026 – Nach Lesern bewertet",
  description:
    "Die besten Geschichtsbücher, sortiert nach verifizierten Amazon-Leserbewertungen. Von der Antike bis zur Moderne, das Richtige für jeden Geschichtsinteressierten.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-geschichtsbuecher",
    languages: {
      en: "https://www.skriuwer.com/best-history-books",
      de: "https://www.skriuwer.com/de/beste-geschichtsbuecher",
    },
  },
  openGraph: {
    title: "Beste Geschichtsbücher 2026 – Nach Lesern bewertet",
    description:
      "Die besten Geschichtsbücher, sortiert nach verifizierten Amazon-Leserbewertungen. Von der Antike bis zur Moderne.",
    url: "https://www.skriuwer.com/de/beste-geschichtsbuecher",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Geschichte ist keine trockene Aneinanderreihung von Jahreszahlen. Die besten Geschichtsbücher zeigen, wie einzelne Entscheidungen ganze Reiche schufen oder vernichteten. Und warum dieselben Muster sich immer wieder wiederholen, auch heute noch.",
  "Die Bücher auf dieser Seite sind nach verifizierten Amazon-Leserbewertungen sortiert. Je mehr Bewertungen ein Buch hat, desto mehr Menschen haben es tatsächlich gelesen und bewertet. Das ist ein zuverlässigerer Indikator als jede Redakteursmeinung.",
];

const FAQ = [
  {
    q: "Welche Geschichtsbücher eignen sich für Einsteiger?",
    a: "Beginnen Sie mit Büchern, die eine bestimmte Epoche oder ein einzelnes Ereignis abdecken, anstatt die gesamte Weltgeschichte auf einmal zu behandeln. Die auf dieser Seite am höchsten bewerteten Bücher sind in der Regel auch die zugänglichsten: Sie sind wie Geschichten geschrieben, nicht wie Lehrbücher.",
  },
  {
    q: "Gibt es diese Geschichtsbücher auch auf Deutsch?",
    a: "Viele der beliebtesten Titel sind als deutsche Übersetzung auf Amazon.de erhältlich. Auf den einzelnen Buchseiten finden Sie Links zu Amazon DE, NL, UK und US. Wählen Sie den Shop, der für Ihren Standort am besten geeignet ist.",
  },
  {
    q: "Welche Zeitspanne decken die Bücher auf dieser Seite ab?",
    a: "Die Auswahl reicht von der Antike (Griechenland, Rom, Ägypten) über das Mittelalter und die frühe Neuzeit bis zur Moderne, einschließlich der Weltkriege und der jüngsten Geschichte. Jede Epoche ist mit mindestens einigen gut bewerteten Titeln vertreten.",
  },
  {
    q: "Sind die Bücher auch als E-Book oder Hörbuch verfügbar?",
    a: "Die meisten Titel sind auf Amazon als Kindle-E-Book und viele auch als Audible-Hörbuch erhältlich. Die Linkseiten der einzelnen Bücher führen direkt zu Amazon, wo Sie zwischen den verfügbaren Formaten wählen können.",
  },
  {
    q: "Wie werden die Bücher auf dieser Seite eingestuft?",
    a: "Ausschließlich nach der Anzahl der verifizierten Leserbewertungen auf Amazon. Bücher mit mehr Bewertungen stehen weiter oben. Das bedeutet nicht unbedingt, dass sie objektiv besser sind, aber es bedeutet, dass tatsächlich mehr Menschen sie gelesen und ihre Meinung dazu geäußert haben.",
  },
];

export default function BesteGeschichtsbuecher() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Geschichtsbücher 2026"
      description="Die meistgelesenen und bestbewerteten Geschichtsbücher auf Amazon, von der Antike bis zur Gegenwart, sortiert nach Leserbewertungen."
      books={books}
      breadcrumb="Beste Geschichtsbücher"
      categoryPage="/category/history"
      categoryLabel="Geschichte"
      canonical="https://www.skriuwer.com/de/beste-geschichtsbuecher"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
