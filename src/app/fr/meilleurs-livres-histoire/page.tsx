import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres d'Histoire 2026 – Classés par avis lecteurs",
  description: "Les meilleurs livres d'histoire classés par nombre d'avis Amazon vérifiés. Des récits qui révèlent ce que les manuels scolaires omettent.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-histoire",
    languages: {
      en: "https://www.skriuwer.com/best-history-books",
      de: "https://www.skriuwer.com/de/beste-geschichtsbuecher",
      nl: "https://www.skriuwer.com/nl/beste-geschiedenisboeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-histoire",
    },
  },
  openGraph: {
    title: "Meilleurs Livres d'Histoire 2026 – Classés par avis lecteurs",
    description: "Les meilleurs livres d'histoire classés par avis Amazon vérifiés.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-histoire",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "L'histoire officielle est toujours un choix éditorial. Les gouvernements décident de ce qui entre dans les manuels. Les éditeurs décident de ce qui est imprimé. Les meilleurs livres d'histoire vont au-delà du récit dominant pour révéler ce qui s'est vraiment passé.",
  "Cette liste couvre l'histoire ancienne, médiévale et moderne — des empires oubliés aux révolutions industrielles en passant par les guerres mondiales. Tous classés par nombre d'avis lecteurs vérifiés sur Amazon.",
];

const FAQ = [
  {
    q: "Comment choisir un bon livre d'histoire ?",
    a: "Privilégiez les auteurs disposant d'une formation académique ou journalistique, les ouvrages avec des notes de bas de page et une bibliographie solide. Les livres qui remettent en question le récit officiel avec des preuves sont généralement plus fiables que ceux qui se contentent de confirmer les idées reçues.",
  },
  {
    q: "Quelle période historique est la mieux représentée ?",
    a: "Cette liste couvre un spectre large : Antiquité, Moyen Âge, ère moderne et histoire contemporaine. Le classement est déterminé par les avis lecteurs Amazon, ce qui reflète naturellement les périodes les plus lues.",
  },
  {
    q: "Y a-t-il des livres d'histoire disponibles en français ?",
    a: "Oui. Plusieurs titres de cette liste sont disponibles en traduction française sur Amazon.fr. Vérifiez la disponibilité sur chaque page de livre individuelle.",
  },
  {
    q: "Ces livres sont-ils adaptés aux débutants ?",
    a: "La plupart oui. Les livres les mieux notés sont souvent ceux qui rendent l'histoire accessible sans sacrifier la rigueur. Un bon livre d'histoire se lit comme un roman mais repose sur des faits documentés.",
  },
];

export default function MeilleursLivresHistoire() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Meilleurs Livres d'Histoire 2026"
      description="Les livres d'histoire les plus lus, classés par avis lecteurs vérifiés sur Amazon. Des récits qui vont au-delà du manuel scolaire."
      books={books}
      breadcrumb="Livres d'Histoire"
      categoryPage="/category/history"
      categoryLabel="Histoire"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-histoire"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
