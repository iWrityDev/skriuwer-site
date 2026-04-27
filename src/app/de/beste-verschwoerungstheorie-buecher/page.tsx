import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Verschwörungstheorie-Bücher 2026 – Fakten hinter den Mythen",
  description:
    "Die besten Bücher über Verschwörungstheorien, Vertuschungen und verborgene Geschichte, sortiert nach verifizierten Amazon-Leserbewertungen.",
  alternates: {
    canonical: "https://www.skriuwer.com/de/beste-verschwoerungstheorie-buecher",
    languages: {
      en: "https://www.skriuwer.com/best-conspiracy-books",
      de: "https://www.skriuwer.com/de/beste-verschwoerungstheorie-buecher",
    },
  },
  openGraph: {
    title: "Beste Verschwörungstheorie-Bücher 2026 – Fakten hinter den Mythen",
    description:
      "Die besten Bücher über Verschwörungstheorien, Vertuschungen und verborgene Geschichte.",
    url: "https://www.skriuwer.com/de/beste-verschwoerungstheorie-buecher",
    type: "website",
    locale: "de_DE",
  },
};

const INTRO = [
  "Nicht jede Verschwörungstheorie ist falsch, und nicht jede ist wahr. Die besten Bücher zu diesem Thema trennen belegbare Fakten von Spekulation, untersuchen reale Vertuschungsaktionen von Regierungen und Konzernen und zeigen, wie Desinformation funktioniert.",
  "Diese Liste umfasst sowohl Bücher, die echte historische Verschwörungen dokumentieren, als auch solche, die kritisch mit populären Theorien umgehen. Alle nach der Anzahl der verifizierten Leserbewertungen auf Amazon sortiert.",
];

const FAQ = [
  {
    q: "Was ist der Unterschied zwischen einer echten Verschwörung und einer Verschwörungstheorie?",
    a: "Eine echte Verschwörung ist ein belegtes, geheimes Komplott (wie MKUltra, Watergate oder die Tabak-Lobby-Kampagnen der 1960er-Jahre). Eine Verschwörungstheorie ist eine unbeweisbare Behauptung über eine geheime Macht. Die Grenzen sind fließend, und genau das macht dieses Thema so faszinierend.",
  },
  {
    q: "Sind diese Bücher seriös oder eher reißerisch?",
    a: "Beides ist auf dieser Liste vertreten, aber die höchstbewerteten Bücher sind in der Regel die, die mit Belegen arbeiten. Bücher, die ausschließlich auf Annahmen beruhen, werden von Lesern im Laufe der Zeit schlechter bewertet.",
  },
  {
    q: "Welche echten Verschwörungen werden in diesen Büchern behandelt?",
    a: "Unter anderem: die CIA-Experimente mit LSD an unwissenden Probanden, staatliche Überwachungsprogramme, die Manipulation von Wahlen, Unterdrückung medizinischer Forschung durch Pharmaunternehmen und verschiedene politische Attentate.",
  },
  {
    q: "Sind diese Bücher auch auf Deutsch erhältlich?",
    a: "Einige der auf dieser Seite empfohlenen Titel sind als deutsche Übersetzung auf Amazon.de erhältlich. Überprüfen Sie die Verfügbarkeit auf den einzelnen Buchseiten.",
  },
  {
    q: "Wie erkenne ich ein seriöses Buch zu diesem Thema?",
    a: "Achten Sie auf: Quellenangaben im Anhang, einen Autor mit journalistischem oder wissenschaftlichem Hintergrund, und einen Verlag mit Ruf. Bücher, die jeden Aspekt als absolut wahr darstellen, ohne Gegenargumente zuzulassen, sind in der Regel unzuverlässig.",
  },
];

export default function BesteVerschwoerungstheorieBuecher() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("conspiracy"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Verschwörungstheorie-Bücher 2026"
      description="Die meistgelesenen Bücher über Verschwörungen, Vertuschungen und verborgene Geschichte, faktenbasiert, nach Leserbewertungen auf Amazon sortiert."
      books={books}
      breadcrumb="Verschwörungstheorie-Bücher"
      categoryPage="/category/conspiracy"
      categoryLabel="Verschwörung"
      canonical="https://www.skriuwer.com/de/beste-verschwoerungstheorie-buecher"
      reviewer="Auke & das Skriuwer-Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="de"
    />
  );
}
