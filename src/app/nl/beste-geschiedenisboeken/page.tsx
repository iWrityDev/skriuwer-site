import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Geschiedenisboeken 2026 – Beoordeeld door lezers",
  description: "De beste geschiedenisboeken, gesorteerd op geverifieerde Amazon-lezersbeoordelingen. Van de Oudheid tot de moderne tijd, voor elke geschiedenisliefhebber.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-geschiedenisboeken",
    languages: {
      en: "https://www.skriuwer.com/best-history-books",
      nl: "https://www.skriuwer.com/nl/beste-geschiedenisboeken",
    },
  },
  openGraph: {
    title: "Beste Geschiedenisboeken 2026 – Beoordeeld door lezers",
    description: "De beste geschiedenisboeken, gesorteerd op geverifieerde Amazon-lezersbeoordelingen.",
    url: "https://www.skriuwer.com/nl/beste-geschiedenisboeken",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "Geschiedenis is geen droge opeenvolging van jaartallen. De beste geschiedenisboeken laten zien hoe individuele beslissingen hele rijken schiepen of vernietigden, en waarom dezelfde patronen zich steeds opnieuw herhalen, ook vandaag.",
  "De boeken op deze pagina zijn gesorteerd op geverifieerde Amazon-lezersbeoordelingen. Hoe meer beoordelingen een boek heeft, hoe meer mensen het daadwerkelijk hebben gelezen en hun mening hebben gegeven. Dat is een betrouwbaardere indicator dan welke redacteursmening dan ook.",
];

const FAQ = [
  {
    q: "Welke geschiedenisboeken zijn geschikt voor beginners?",
    a: "Begin met boeken die een specifieke periode of een enkel gebeurtenis behandelen, in plaats van de hele wereldgeschiedenis in één keer. De hoogst beoordeelde boeken op deze pagina zijn doorgaans ook de toegankelijkste: ze zijn geschreven als verhalen, niet als leerboeken.",
  },
  {
    q: "Zijn deze boeken ook in het Nederlands beschikbaar?",
    a: "Veel populaire titels zijn als Nederlandse vertaling beschikbaar op Amazon.nl. Op de afzonderlijke boekpagina's vindt u links naar Amazon NL, DE, UK en US. Kies de winkel die het beste bij uw locatie past.",
  },
  {
    q: "Welke tijdsperioden komen aan bod?",
    a: "Het aanbod loopt van de Oudheid (Griekenland, Rome, Egypte) via de Middeleeuwen en vroegmoderne tijd tot de moderne geschiedenis, inclusief de wereldoorlogen en recente geschiedenis. Elke periode is vertegenwoordigd met goed beoordeelde titels.",
  },
  {
    q: "Zijn de boeken ook als e-book of luisterboek beschikbaar?",
    a: "De meeste titels zijn op Amazon beschikbaar als Kindle-e-book en veel ook als Audible-luisterboek. De links op de afzonderlijke boekpagina's leiden u direct naar Amazon, waar u tussen de beschikbare formaten kunt kiezen.",
  },
  {
    q: "Hoe worden de boeken op deze pagina gerangschikt?",
    a: "Uitsluitend op basis van het aantal geverifieerde lezersbeoordelingen op Amazon. Boeken met meer beoordelingen staan hoger. Dit betekent niet per se dat ze objectief beter zijn, maar wel dat meer mensen ze daadwerkelijk hebben gelezen en hun mening hebben gegeven.",
  },
];

export default function BesteGeschiedenisboeken() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Geschiedenisboeken 2026"
      description="De meest gelezen en best beoordeelde geschiedenisboeken op Amazon, van de Oudheid tot heden, gesorteerd op lezersbeoordelingen."
      books={books}
      breadcrumb="Beste Geschiedenisboeken"
      categoryPage="/category/history"
      categoryLabel="Geschiedenis"
      canonical="https://www.skriuwer.com/nl/beste-geschiedenisboeken"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
