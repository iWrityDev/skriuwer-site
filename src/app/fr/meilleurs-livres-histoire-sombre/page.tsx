import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres d'Histoire Sombre 2026 – Ce que les manuels omettent",
  description: "Les meilleurs livres sur l'histoire sombre : pages cachées, crimes oubliés et l'envers de l'historiographie officielle. Classés par avis Amazon.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-histoire-sombre",
    languages: {
      en: "https://www.skriuwer.com/best-dark-history-books",
      de: "https://www.skriuwer.com/de/beste-dunkle-geschichte-buecher",
      nl: "https://www.skriuwer.com/nl/beste-donkere-geschiedenis-boeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-histoire-sombre",
    },
  },
  openGraph: {
    title: "Meilleurs Livres d'Histoire Sombre 2026 – Ce que les manuels omettent",
    description: "Les meilleurs livres sur l'histoire sombre, les pages que les manuels scolaires n'incluent pas.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-histoire-sombre",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "L'historiographie officielle est toujours un choix. Les gouvernements décident de ce qui entre dans les manuels scolaires. Les éditeurs décident de ce qui est imprimé. Beaucoup de ce qui s'est réellement passé est discrètement mis de côté. Les livres d'histoire sombre portent précisément sur ces pages omises.",
  "Les meilleurs auteurs dans ce domaine travaillent avec des sources et évitent le sensationnalisme. Ils expliquent comment c'est arrivé, qui était au courant et pourquoi c'est resté caché si longtemps. Les livres de cette page sont classés par nombre d'avis lecteurs vérifiés sur Amazon.",
];

const FAQ = [
  {
    q: "Quelle est la différence entre histoire sombre et histoire ordinaire ?",
    a: "Les livres d'histoire ordinaires suivent généralement le récit officiel. Les livres d'histoire sombre se concentrent sur l'envers : abus de pouvoir, secrets d'État, crimes oubliés et les personnes exclues du récit officiel.",
  },
  {
    q: "Ces livres sont-ils fondés sur des faits ou sont-ils sensationnels ?",
    a: "Les deux types sont présents dans le classement, mais les livres les mieux notés travaillent généralement avec des sources et des notes de bas de page. Les lecteurs notent moins bien au fil du temps les livres qui reposent sur des suppositions. Privilégiez les auteurs avec une formation journalistique ou académique.",
  },
  {
    q: "Quels sujets sont abordés ?",
    a: "Entre autres : expériences d'État sur des citoyens non informés, assassinats politiques, crimes coloniaux, histoires de guerre cachées et fonctionnement de la propagande. Le classement couvre un large spectre de périodes et de régions.",
  },
  {
    q: "Ces livres sont-ils disponibles en français ?",
    a: "Certains des titres recommandés sont disponibles en traduction française sur Amazon.fr. Vérifiez la disponibilité sur les pages de livres individuels.",
  },
];

export default function MeilleursLivresHistoireSombre() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("dark-history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Meilleurs Livres d'Histoire Sombre 2026"
      description="Les livres les plus lus sur l'histoire cachée, les crimes oubliés et l'envers de l'historiographie officielle, classés par avis Amazon."
      books={books}
      breadcrumb="Histoire Sombre"
      categoryPage="/category/dark-history"
      categoryLabel="Histoire Sombre"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-histoire-sombre"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
