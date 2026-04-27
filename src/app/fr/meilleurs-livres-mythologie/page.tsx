import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres de Mythologie 2026 – Grecque, Nordique, Égyptienne",
  description: "Les meilleurs livres de mythologie : dieux grecs, héros nordiques, cosmologie égyptienne. Classés par avis Amazon vérifiés.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie",
    languages: {
      en: "https://www.skriuwer.com/best-mythology-books",
      de: "https://www.skriuwer.com/de/beste-mythologie-buecher",
      nl: "https://www.skriuwer.com/nl/beste-mythologie-boeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie",
    },
  },
  openGraph: {
    title: "Meilleurs Livres de Mythologie 2026 – Grecque, Nordique, Égyptienne",
    description: "Les meilleurs livres de mythologie : dieux grecs, héros nordiques, cosmologie égyptienne.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "La mythologie n'est pas une littérature pour enfants. Ce sont les récits par lesquels les civilisations tentaient de répondre aux questions que la science ne pouvait pas encore résoudre : pourquoi le mal existe-t-il, que se passe-t-il après la mort, pourquoi les hommes sont-ils si cruels entre eux ? Les dieux sont humains, complexes et souvent décevants.",
  "Les livres de cette page couvrent tout le spectre : des textes académiques sur les sources originales aux adaptations modernes accessibles sans connaissance préalable.",
];

const FAQ = [
  {
    q: "Par où commencer si je suis nouveau en mythologie ?",
    a: "Commencez par une adaptation moderne en prose accessible avant de vous attaquer aux textes originaux. La mythologie grecque est un bon point de départ, car de nombreuses histoires sont déjà connues de la culture populaire. Les livres les mieux notés sur cette page sont généralement aussi les plus accessibles.",
  },
  {
    q: "Quelle est la différence entre la mythologie grecque et nordique ?",
    a: "La mythologie grecque tourne autour des faiblesses humaines et des caprices des dieux. La mythologie nordique a une tonalité plus sombre : les dieux eux-mêmes mourront lors du Ragnarök, et ils le savent. Cette attitude fataliste rend la mythologie nordique philosophiquement plus intéressante pour de nombreux lecteurs.",
  },
  {
    q: "Y a-t-il de bons livres de mythologie en français ?",
    a: "Oui, des traductions de livres modernes ainsi que des éditions des textes originaux comme l'Edda sont disponibles en français sur Amazon.fr. Vérifiez la disponibilité sur chaque page de livre.",
  },
  {
    q: "Quelles mythologies sont représentées sur cette page ?",
    a: "Grecque, nordique, égyptienne, romaine, celtique et plus encore. Le classement est déterminé par le nombre d'avis lecteurs Amazon, ce qui fait que les mythologies les plus populaires apparaissent naturellement en tête.",
  },
];

export default function MeilleursLivresMythologie() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("mythology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Meilleurs Livres de Mythologie 2026"
      description="Les livres de mythologie les plus lus — grecque, nordique, égyptienne et autres — classés par avis lecteurs sur Amazon."
      books={books}
      breadcrumb="Livres de Mythologie"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-mythologie"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
