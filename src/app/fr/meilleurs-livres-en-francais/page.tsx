import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres en Français 2026 – Classés par avis lecteurs",
  description: "Les meilleurs livres disponibles en français : histoire, mythologie, histoire sombre et plus encore. Classés par avis Amazon vérifiés.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-en-francais",
    languages: {
      en: "https://www.skriuwer.com/best-books-in-french",
      nl: "https://www.skriuwer.com/nl/beste-boeken-in-het-nederlands",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-en-francais",
    },
  },
  openGraph: {
    title: "Meilleurs Livres en Français 2026 – Classés par avis lecteurs",
    description: "Les meilleurs livres disponibles en français : histoire, mythologie, histoire sombre et plus.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-en-francais",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "Cette page rassemble les livres les plus populaires disponibles en français, qu'il s'agisse d'œuvres originales francophones ou de traductions. Livres d'histoire, récits bilingues pour apprenants de langues, ouvrages sur la mythologie et les théories du complot.",
  "Tous les livres sont classés par nombre d'avis lecteurs vérifiés sur Amazon. Cela signifie que les livres en tête sont ceux que le plus grand nombre de personnes a réellement lus et notés, et non ceux qui ont le plus grand budget publicitaire.",
];

const FAQ = [
  {
    q: "Quels livres français sont les plus populaires auprès des lecteurs ?",
    a: "Les livres informatifs en français sur l'histoire, l'histoire sombre et les récits de survie sont particulièrement demandés. Sur cette page, les livres sont classés par nombre d'avis Amazon. Plus il y a d'avis, plus le livre est éprouvé.",
  },
  {
    q: "Y a-t-il des livres bilingues disponibles en français ?",
    a: "Oui, cette page contient une sélection de récits courts bilingues pour les francophones souhaitant apprendre une nouvelle langue. Vérifiez la disponibilité sur les pages de livres individuels.",
  },
  {
    q: "Ces livres sont-ils disponibles hors de France ?",
    a: "Oui. Tous les livres renvoient vers Amazon, qui livre à l'international. Les liens sur les pages de livres individuels mènent vers Amazon FR, DE, UK et US. Choisissez la boutique qui correspond le mieux à votre localisation.",
  },
  {
    q: "Quelles catégories sont disponibles en français ?",
    a: "Histoire, histoire sombre, apprentissage des langues (récits bilingues) et crime réel sont les catégories francophones les plus solides sur cette page. De nouveaux titres sont régulièrement ajoutés.",
  },
];

export default function MeilleursLivresEnFrancais() {
  const books = getAllBooks()
    .filter((b) => b.language === "fr")
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Meilleurs Livres en Français 2026"
      description="Les meilleurs titres disponibles en français : histoire, histoire sombre, récits bilingues et plus encore. Classés par avis lecteurs sur Amazon."
      books={books}
      breadcrumb="Livres en Français"
      categoryPage="/category/language-learning"
      categoryLabel="Apprentissage des langues"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-en-francais"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
