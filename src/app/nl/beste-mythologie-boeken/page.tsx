import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Mythologie-boeken 2026 – Grieks, Noors, Egyptisch",
  description: "De beste boeken over mythologie: Griekse goden, Noorse helden, Egyptische kosmologie en meer. Gesorteerd op geverifieerde Amazon-lezersbeoordelingen.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-mythologie-boeken",
    languages: {
      en: "https://www.skriuwer.com/best-mythology-books",
      nl: "https://www.skriuwer.com/nl/beste-mythologie-boeken",
    },
  },
  openGraph: {
    title: "Beste Mythologie-boeken 2026 – Grieks, Noors, Egyptisch",
    description: "De beste boeken over mythologie: Griekse goden, Noorse helden, Egyptische kosmologie.",
    url: "https://www.skriuwer.com/nl/beste-mythologie-boeken",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "Mythologie is geen kindervermaak. Het zijn de verhalen waarmee beschavingen probeerden vragen te beantwoorden die de wetenschap nog niet kon beantwoorden: waarom bestaat er kwaad, wat gebeurt er na de dood, waarom zijn mensen zo wreed tegen elkaar? De goden zijn menselijk, complex en vaak teleurstellend.",
  "De boeken op deze pagina dekken het volledige spectrum af: van wetenschappelijke teksten over de originele bronnen tot toegankelijke moderne naverdichtingen die ook zonder voorkennis te lezen zijn.",
];

const FAQ = [
  {
    q: "Waar begin ik als ik nieuw ben in mythologie?",
    a: "Begin met een moderne naverdichting in toegankelijk proza voordat u naar de originele teksten grijpt. De Griekse mythologie is een goede startpunt, omdat veel verhalen al bekend zijn uit de populaire cultuur. De hoogst beoordeelde boeken op deze pagina zijn doorgaans ook de meest toegankelijke.",
  },
  {
    q: "Wat is het verschil tussen Griekse en Noorse mythologie?",
    a: "Griekse mythologie draait om menselijke tekortkomingen en de grillen van de goden. Noorse mythologie heeft een donkerdere toon: de goden zelf zullen sterven bij Ragnarok, en weten het. Die fatalistische houding maakt Noorse mythologie filosofisch gezien interessanter voor veel lezers.",
  },
  {
    q: "Zijn er goede Nederlandstalige mythologieboeken?",
    a: "Ja, zowel vertalingen van moderne boeken als edities van de originele Edda zijn in het Nederlands beschikbaar via Amazon.nl. Controleer de beschikbaarheid op de afzonderlijke boekpagina's.",
  },
  {
    q: "Welke mythologieën komen aan bod op deze pagina?",
    a: "Grieks, Noors, Egyptisch, Romeins, Keltisch en meer. De ranglijst wordt bepaald door het aantal Amazon-lezersbeoordelingen, waardoor de populairste mythologieën doorgaans bovenaan staan.",
  },
];

export default function BesteMythologieBoeken() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Mythologie-boeken 2026"
      description="De meest gelezen boeken over Griekse, Noorse, Egyptische en andere mythologieën, gesorteerd op lezersbeoordelingen op Amazon."
      books={books}
      breadcrumb="Beste Mythologie-boeken"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/nl/beste-mythologie-boeken"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
