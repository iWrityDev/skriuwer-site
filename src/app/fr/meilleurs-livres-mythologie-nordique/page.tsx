import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres de Mythologie Nordique 2026 – Odin, Thor, Ragnarök",
  description: "Les meilleurs livres sur la mythologie nordique : Vikings, dieux, la fin du monde. Pour débutants et connaisseurs. Classés par avis Amazon vérifiés.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie-nordique",
    languages: {
      en: "https://www.skriuwer.com/best-norse-mythology-books",
      de: "https://www.skriuwer.com/de/beste-nordische-mythologie-buecher",
      nl: "https://www.skriuwer.com/nl/beste-noordse-mythologie-boeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie-nordique",
    },
  },
  openGraph: {
    title: "Meilleurs Livres de Mythologie Nordique 2026 – Odin, Thor, Ragnarök",
    description: "Les meilleurs livres sur la mythologie nordique : Vikings, dieux, la fin du monde.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-mythologie-nordique",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "La mythologie nordique est plus sombre que la grecque. Ici, les dieux eux-mêmes mourront. Odin le sait, s'y prépare et combat quand même. Cette attitude — le courage face à une fin certaine — a façonné la culture viking et fascine les lecteurs du monde entier jusqu'à ce jour.",
  "Les livres de cette page couvrent tout le spectre : des textes académiques sur l'Edda originale aux adaptations modernes captivantes accessibles sans connaissance préalable.",
];

const FAQ = [
  {
    q: "Quelle est la meilleure introduction à la mythologie nordique ?",
    a: "Pour les débutants, il est conseillé de commencer par des adaptations modernes en prose accessible avant de se plonger dans la Prose Edda ou l'Edda poétique. Les sources primaires nécessitent quelques connaissances contextuelles. Les livres les mieux notés sur cette page sont généralement les plus accessibles.",
  },
  {
    q: "Qu'est-ce que le Ragnarök et pourquoi est-il si important ?",
    a: "Le Ragnarök est la fin du monde dans la mythologie nordique : un combat final au cours duquel presque tous les dieux et monstres périssent. Ce qui rend le Ragnarök particulier : il est prédit, inévitable, et les dieux s'y préparent quand même. Cette acceptation du destin est un thème central de la philosophie nordique.",
  },
  {
    q: "En quoi la mythologie nordique diffère-t-elle de la version cinématographique (Marvel) ?",
    a: "Considérablement. Loki dans l'Edda n'est pas un anti-héros héroïque, mais un trickster complexe qui finit par choisir le mal. Thor est moins éloquent et beaucoup plus brutal. Les dieux originaux ont plus de profondeur et d'ambiguïté morale que leurs versions cinématographiques.",
  },
  {
    q: "Y a-t-il des livres de mythologie nordique disponibles en français ?",
    a: "Oui. Des traductions de livres modernes ainsi que des éditions de l'Edda originale sont disponibles en français sur Amazon.fr. Vérifiez la disponibilité sur les pages de livres individuels.",
  },
];

export default function MeilleursLivresMythologieNordique() {
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
      title="Meilleurs Livres de Mythologie Nordique 2026"
      description="Les livres les plus lus sur les Vikings, les dieux et le Ragnarök, des introductions aux textes originaux. Classés par avis lecteurs sur Amazon."
      books={books}
      breadcrumb="Mythologie Nordique"
      categoryPage="/category/mythology"
      categoryLabel="Mythologie"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-mythologie-nordique"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
