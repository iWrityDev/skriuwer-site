import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Donkere Geschiedenis-boeken 2026 – Wat schoolboeken weglaten",
  description: "De beste boeken over donkere geschiedenis: verborgen bladzijden, vergeten misdaden en de keerzijde van de officiële geschiedschrijving. Gesorteerd op Amazon-beoordelingen.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-donkere-geschiedenis-boeken",
    languages: {
      en: "https://www.skriuwer.com/best-dark-history-books",
      nl: "https://www.skriuwer.com/nl/beste-donkere-geschiedenis-boeken",
    },
  },
  openGraph: {
    title: "Beste Donkere Geschiedenis-boeken 2026 – Wat schoolboeken weglaten",
    description: "De beste boeken over de donkere kant van de geschiedenis, de bladzijden die schoolboeken weglaten.",
    url: "https://www.skriuwer.com/nl/beste-donkere-geschiedenis-boeken",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "Officiële geschiedschrijving is altijd een keuze. Regeringen beslissen wat in schoolboeken staat. Uitgevers beslissen wat wordt gedrukt. Veel van wat er werkelijk is gebeurd, wordt stilletjes terzijde geschoven. Donkere-geschiedenisboeken gaan juist over die weggelaten bladzijden.",
  "De beste auteurs op dit terrein werken met bronnen en vermijden sensatiezucht. Ze leggen uit hoe het kon gebeuren, wie ervan wist en waarom het zo lang verborgen bleef. De boeken op deze pagina zijn gesorteerd op het aantal geverifieerde Amazon-lezersbeoordelingen.",
];

const FAQ = [
  {
    q: "Wat is het verschil tussen donkere geschiedenis en gewone geschiedenis?",
    a: "Gewone geschiedenisboeken volgen doorgaans de officiële narratief. Donkere-geschiedenisboeken richten zich op de keerzijde: machtsmisbruik, staatsgeheimen, vergeten misdaden en de mensen die werden uitgesloten van het officiële verhaal.",
  },
  {
    q: "Zijn deze boeken feitelijk onderbouwd of sensationeel?",
    a: "Beide typen zijn aanwezig in de ranglijst, maar de hoogst beoordeelde boeken werken doorgaans met bronnen en voetnoten. Lezers beoordelen boeken die op aannames berusten over tijd slechter. Kijk naar auteurs met een journalistieke of academische achtergrond.",
  },
  {
    q: "Welke onderwerpen komen aan bod?",
    a: "Onder andere: staatsexperimenten op onwetende burgers, politieke aanslagen, koloniale misdaden, verborgen oorlogsgeschiedenissen, en hoe propaganda werkt. De ranglijst dekt een breed spectrum van perioden en regio's.",
  },
  {
    q: "Zijn deze boeken ook in het Nederlands beschikbaar?",
    a: "Sommige van de aanbevolen titels zijn als Nederlandse vertaling beschikbaar via Amazon.nl. Controleer de beschikbaarheid op de afzonderlijke boekpagina's.",
  },
];

export default function BesteDonkereGeschiedenisBoeken() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("dark-history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Donkere Geschiedenis-boeken 2026"
      description="De meest gelezen boeken over verborgen geschiedenis, vergeten misdaden en de keerzijde van de officiële geschiedschrijving, gesorteerd op Amazon-beoordelingen."
      books={books}
      breadcrumb="Donkere Geschiedenis"
      categoryPage="/category/dark-history"
      categoryLabel="Donkere Geschiedenis"
      canonical="https://www.skriuwer.com/nl/beste-donkere-geschiedenis-boeken"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
