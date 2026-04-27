import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Complottheorie-boeken 2026 – Feiten achter de mythes",
  description: "De beste boeken over samenzweringstheorieën, doofpotten en verborgen geschiedenis, gesorteerd op geverifieerde Amazon-lezersbeoordelingen.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-complottheorie-boeken",
    languages: {
      en: "https://www.skriuwer.com/best-conspiracy-books",
      nl: "https://www.skriuwer.com/nl/beste-complottheorie-boeken",
    },
  },
  openGraph: {
    title: "Beste Complottheorie-boeken 2026 – Feiten achter de mythes",
    description: "De beste boeken over samenzweringstheorieën, doofpotten en verborgen geschiedenis.",
    url: "https://www.skriuwer.com/nl/beste-complottheorie-boeken",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "Niet elke samenzweringstheorie is onjuist, en niet elke is waar. De beste boeken over dit onderwerp scheiden aantoonbare feiten van speculatie, onderzoeken echte doofpotten van regeringen en bedrijven en laten zien hoe desinformatie werkt.",
  "Deze lijst omvat zowel boeken die echte historische samenzweringen documenteren als boeken die kritisch omgaan met populaire theorieën. Alle gesorteerd op het aantal geverifieerde lezersbeoordelingen op Amazon.",
];

const FAQ = [
  {
    q: "Wat is het verschil tussen een echte samenzwering en een samenzweringstheorie?",
    a: "Een echte samenzwering is een aantoonbaar, geheim complot (zoals MKUltra, Watergate of de tabakslobbycampagnes van de jaren zestig). Een samenzweringstheorie is een onbewijsbare bewering over een geheime macht. De grenzen zijn vaag, en dat maakt dit onderwerp zo fascinerend.",
  },
  {
    q: "Zijn deze boeken serieus of eerder sensationeel?",
    a: "Beide zijn vertegenwoordigd in deze ranglijst, maar de hoogst beoordeelde boeken werken doorgaans met bronnen. Boeken die uitsluitend op aannames berusten, worden door lezers over tijd slechter beoordeeld.",
  },
  {
    q: "Welke echte samenzweringen komen in deze boeken aan bod?",
    a: "Onder andere: CIA-experimenten met LSD op onwetende proefpersonen, staatssurveillanceprogramma's, het manipuleren van verkiezingen, het onderdrukken van medisch onderzoek door farmaceutische bedrijven en diverse politieke aanslagen.",
  },
  {
    q: "Hoe herken ik een serieus boek over dit onderwerp?",
    a: "Let op: bronvermeldingen in de bijlage, een auteur met journalistieke of wetenschappelijke achtergrond, en een uitgever met reputatie. Boeken die elk aspect als absoluut waar presenteren zonder tegenargumenten toe te laten, zijn doorgaans onbetrouwbaar.",
  },
];

export default function BesteComplottheorieBoeken() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("conspiracy"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Complottheorie-boeken 2026"
      description="De meest gelezen boeken over samenzweringen, doofpotten en verborgen geschiedenis, feitelijk onderbouwd en gesorteerd op lezersbeoordelingen op Amazon."
      books={books}
      breadcrumb="Complottheorie-boeken"
      categoryPage="/category/conspiracy"
      categoryLabel="Complottheorie"
      canonical="https://www.skriuwer.com/nl/beste-complottheorie-boeken"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
