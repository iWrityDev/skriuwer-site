import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Beste Boeken in het Nederlands 2026 – Top-titels op lezersbeoordelingen",
  description: "De beste Nederlandstalige boeken uit alle genres: geschiedenis, mythologie, taalonderwijs, donkere geschiedenis en meer. Gesorteerd op Amazon-beoordelingen.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl/beste-boeken-in-het-nederlands",
    languages: {
      en: "https://www.skriuwer.com/best-books-in-dutch",
      nl: "https://www.skriuwer.com/nl/beste-boeken-in-het-nederlands",
    },
  },
  openGraph: {
    title: "Beste Boeken in het Nederlands 2026 – Top-titels op lezersbeoordelingen",
    description: "De beste Nederlandstalige boeken uit alle genres: geschiedenis, mythologie, taalonderwijs, donkere geschiedenis en meer.",
    url: "https://www.skriuwer.com/nl/beste-boeken-in-het-nederlands",
    type: "website",
    locale: "nl_NL",
  },
};

const INTRO = [
  "Deze pagina verzamelt de populairste boeken die in het Nederlands zijn verschenen, of het nu gaat om originele Nederlandstalige werken of vertalingen. Informatieve boeken over geschiedenis en donkere geschiedenis, tweetalige vertellingen voor taalstudenten en titels over mythologie en samenzweringstheorieën.",
  "Alle boeken zijn gesorteerd op het aantal geverifieerde lezersbeoordelingen op Amazon. Dat betekent: bovenaan staan de boeken die de meeste mensen daadwerkelijk hebben gelezen en beoordeeld, niet de boeken met het grootste reclamebudget.",
];

const FAQ = [
  {
    q: "Welke Nederlandse boeken zijn het populairst bij lezers?",
    a: "Nederlandstalige informatieve boeken over geschiedenis, donkere geschiedenis en overlevingsverhalen zijn bijzonder gevraagd. Op deze pagina worden boeken gesorteerd op het aantal Amazon-beoordelingen. Hoe meer beoordelingen, hoe bewezen het boek.",
  },
  {
    q: "Zijn er tweetalige boeken beschikbaar in het Nederlands?",
    a: "Ja, deze pagina bevat een selectie tweetalige korte verhalen voor Nederlandssprekenden die een nieuwe taal willen leren, waaronder Nederlands-Engels, Nederlands-Russisch, Nederlands-Turks en meer.",
  },
  {
    q: "Zijn deze boeken buiten Nederland beschikbaar?",
    a: "Ja. Alle boeken linken naar Amazon, dat internationaal levert. De links op de afzonderlijke boekpagina's leiden naar Amazon NL, DE, UK en US. Kies de winkel die het beste bij uw locatie past.",
  },
  {
    q: "Welke categorieën zijn in het Nederlands beschikbaar?",
    a: "Geschiedenis, donkere geschiedenis, taalonderwijs (tweetalige verhalen) en true crime zijn de sterkste Nederlandstalige categorieën op deze pagina. Er worden regelmatig nieuwe titels toegevoegd.",
  },
];

export default function BesteBookenInHetNederlands() {
  const books = getAllBooks()
    .filter((b) => b.language === "nl")
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Beste Boeken in het Nederlands 2026"
      description="De sterkste Nederlandstalige titels: geschiedenis, donkere geschiedenis, tweetalige verhalen en meer. Gesorteerd op lezersbeoordelingen op Amazon."
      books={books}
      breadcrumb="Beste Boeken in het Nederlands"
      categoryPage="/category/language-learning"
      categoryLabel="Taal leren"
      canonical="https://www.skriuwer.com/nl/beste-boeken-in-het-nederlands"
      reviewer="Auke & het Skriuwer-team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="nl"
    />
  );
}
