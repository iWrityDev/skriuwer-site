import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Bücher über dunkle Geschichte 2026 – Was Schulbücher auslassen",
  description:
    "Die besten Bücher über die dunklen Seiten der Geschichte: Verbrechen, Vertuschungen und vergessene Gräueltaten. Nach Amazon-Leserbewertungen sortiert.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-dunkle-geschichte-buecher",
    languages: {
      en: "https://www.skriuwer.com/best-dark-history-books",
      de: "https://www.skriuwer.com/de/beste-dunkle-geschichte-buecher",
    },
  },
  openGraph: {
    title: "Beste Bücher über dunkle Geschichte 2026 – Was Schulbücher auslassen",
    description:
      "Die besten Bücher über die dunklen Seiten der Geschichte: Verbrechen, Vertuschungen und vergessene Gräueltaten.",
    url: "https://www.skriuwer.com/de/beste-dunkle-geschichte-buecher",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Die offizielle Geschichtsschreibung lässt vieles aus. Nicht aus Versehen, sondern weil unbequeme Wahrheiten Macht untergraben, Helden entzaubern und bequeme Narrative zerstören. Die Bücher auf dieser Seite gehen dorthin, wo Schulbücher aufhören.",
  "Dunkle Geschichte bedeutet nicht Sensationslust. Es bedeutet, die vollständige Geschichte zu erzählen (einschließlich der Teile, die absichtlich vergraben wurden). Sortiert nach Leserbewertungen auf Amazon, damit die Bücher oben stehen, die tatsächlich etwas bewirkt haben.",
];

const FAQ = [
  {
    q: "Was versteht man unter 'dunkler Geschichte'?",
    a: "Dunkle Geschichte bezeichnet historische Ereignisse, die in der Mainstream-Geschichtsschreibung bewusst oder unbewusst verharmlost, verdrängt oder verschwiegen werden. Dazu gehören Gräueltaten, staatlich sanktionierte Verbrechen, koloniale Gewalt und Vertuschungen durch mächtige Institutionen.",
  },
  {
    q: "Sind diese Bücher für ein breites Publikum geeignet?",
    a: "Die meisten ja. Sie sind für interessierte Leser ohne Fachkenntnisse geschrieben. Manche Inhalte sind erschütternd, und das ist beabsichtigt. Geschichte, die nicht erschüttert, ist keine ehrliche Geschichte.",
  },
  {
    q: "Sind die Inhalte faktisch belegt?",
    a: "Die auf dieser Seite empfohlenen Bücher stützen sich auf historische Quellen, Archivmaterial und akademische Forschung. Populäre Geschichte bedeutet nicht ungenaue Geschichte. Die besten Autoren in diesem Genre sind rigoros in ihrer Quellenarbeit.",
  },
  {
    q: "Gibt es dunkle Geschichtsbücher auf Deutsch?",
    a: "Ja. Auf der Seite 'Beste Bücher auf Deutsch' finden Sie deutschsprachige Ausgaben zu diesem und anderen Themen.",
  },
  {
    q: "Warum sollte ich diese Bücher lesen?",
    a: "Weil ein vollständiges Bild der Vergangenheit notwendig ist, um die Gegenwart zu verstehen. Viele der politischen und sozialen Konflikte von heute haben ihre Wurzeln in Ereignissen, über die in Schulen kaum gesprochen wird.",
  },
];

export default function BesteDunkleGeschichteBuecher() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("dark-history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Bücher über dunkle Geschichte 2026"
      description="Die meistgelesenen Bücher über die dunklen Seiten der Geschichte, was Schulbücher weglassen, Vertuschungen aufdecken und unbequeme Wahrheiten erzählen."
      books={books}
      breadcrumb="Dunkle Geschichte"
      categoryPage="/category/dark-history"
      categoryLabel="Dunkle Geschichte"
      canonical="https://www.skriuwer.com/de/beste-dunkle-geschichte-buecher"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
