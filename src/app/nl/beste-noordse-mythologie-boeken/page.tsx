import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Boeken over Noordse Mythologie 2026 – Odin, Thor, Ragnarok",
  description: "De beste boeken over Noordse mythologie: Vikingen, goden, het einde der wereld. Voor beginners en kenners. Gesorteerd op geverifieerde Amazon-lezersbeoordelingen.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-noordse-mythologie-boeken",
    languages: {
      en: "https://www.skriuwer.com/best-norse-mythology-books",
      nl: "https://www.skriuwer.com/nl/beste-noordse-mythologie-boeken",
    },
  },
  openGraph: {
    title: "Beste Boeken over Noordse Mythologie 2026 – Odin, Thor, Ragnarok",
    description: "De beste boeken over Noordse mythologie: Vikingen, goden, het einde der wereld.",
    url: "https://www.skriuwer.com/nl/beste-noordse-mythologie-boeken",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "De Noordse mythologie is duisterder dan de Griekse. Hier zullen de goden zelf sterven. Odin weet het, bereidt zich voor en vecht toch door. Die houding, moed tegenover een zeker einde, heeft de Vikingcultuur gevormd en fascineert lezers wereldwijd tot op de dag van vandaag.",
  "De boeken op deze pagina bestrijken het volledige spectrum: van wetenschappelijke teksten over de originele Edda tot meeslepende moderne naverdichtingen die ook zonder voorkennis toegankelijk zijn.",
];

const FAQ = [
  {
    q: "Wat is de beste introductie tot de Noordse mythologie?",
    a: "Voor beginners zijn moderne naverdichtingen in toegankelijk proza aan te raden voordat u de Proza-Edda of Lied-Edda ter hand neemt. De primaire bronnen vereisen enige contextuele kennis. De hoogst beoordeelde boeken op deze pagina zijn doorgaans de meest toegankelijke.",
  },
  {
    q: "Wat is Ragnarok en waarom is het zo belangrijk?",
    a: "Ragnarok is het einde der wereld in de Noordse mythologie: een laatste gevecht waarbij bijna alle goden en monsters sterven. Wat Ragnarok bijzonder maakt: het is voorspeld, onvermijdelijk, en de goden bereiden zich er toch op voor. Die acceptatie van het lot is een kernthema van de Noordse filosofie.",
  },
  {
    q: "Hoe verschilt de Noordse mythologie van de filmversie (Marvel)?",
    a: "Aanzienlijk. Loki in de Edda is geen heldhaftige antiheld, maar een complexe trickster die uiteindelijk het kwaad kiest. Thor is minder welbespraakt en aanzienlijk brutaler. De originele goden hebben meer diepgang en morele ambiguïteit dan hun filmversies.",
  },
  {
    q: "Zijn er Noordse mythologie-boeken in het Nederlands beschikbaar?",
    a: "Ja. Zowel vertalingen van moderne boeken als edities van de originele Edda zijn in het Nederlands beschikbaar via Amazon.nl. Controleer de beschikbaarheid op de afzonderlijke boekpagina's.",
  },
];

export default function BesteNoordseMythologieBoeken() {
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
      title="Beste Boeken over Noordse Mythologie 2026"
      description="De meest gelezen boeken over Vikingen, goden en Ragnarok, van inleidende werken tot de originele Edda. Gesorteerd op lezersbeoordelingen op Amazon."
      books={books}
      breadcrumb="Noordse Mythologie"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/nl/beste-noordse-mythologie-boeken"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
