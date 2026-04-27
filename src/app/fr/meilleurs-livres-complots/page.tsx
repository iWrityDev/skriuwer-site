import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Meilleurs Livres sur les Complots 2026 – Faits derrière les mythes",
  description: "Les meilleurs livres sur les théories du complot, les dissimulations et l'histoire cachée, classés par avis lecteurs Amazon vérifiés.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr/meilleurs-livres-complots",
    languages: {
      en: "https://www.skriuwer.com/best-conspiracy-books",
      de: "https://www.skriuwer.com/de/beste-verschwoerungstheorie-buecher",
      nl: "https://www.skriuwer.com/nl/beste-complottheorie-boeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-complots",
    },
  },
  openGraph: {
    title: "Meilleurs Livres sur les Complots 2026 – Faits derrière les mythes",
    description: "Les meilleurs livres sur les théories du complot, les dissimulations et l'histoire cachée.",
    url: "https://www.skriuwer.com/fr/meilleurs-livres-complots",
    type: "website",
    locale: "fr_FR",
  },
};

const INTRO = [
  "Toutes les théories du complot ne sont pas fausses, et toutes ne sont pas vraies. Les meilleurs livres sur ce sujet séparent les faits démontrables de la spéculation, examinent les véritables dissimulations des gouvernements et des entreprises et montrent comment la désinformation fonctionne.",
  "Cette liste comprend à la fois des livres documentant de vraies conspirations historiques et des livres traitant de manière critique les théories populaires. Tous classés par nombre d'avis lecteurs vérifiés sur Amazon.",
];

const FAQ = [
  {
    q: "Quelle est la différence entre une vraie conspiration et une théorie du complot ?",
    a: "Une vraie conspiration est un complot secret démontrable (comme MKUltra, le Watergate ou les campagnes des lobbies du tabac des années 1960). Une théorie du complot est une affirmation invérifiable sur un pouvoir secret. Les frontières sont floues, et c'est ce qui rend ce sujet si fascinant.",
  },
  {
    q: "Ces livres sont-ils sérieux ou plutôt sensationnels ?",
    a: "Les deux sont représentés dans ce classement, mais les livres les mieux notés travaillent généralement avec des sources. Les livres qui reposent uniquement sur des suppositions sont moins bien notés par les lecteurs avec le temps.",
  },
  {
    q: "Quelles vraies conspirations ces livres abordent-ils ?",
    a: "Entre autres : expériences de la CIA avec le LSD sur des sujets non informés, programmes de surveillance d'État, manipulation d'élections, suppression de recherches médicales par des entreprises pharmaceutiques et divers assassinats politiques.",
  },
  {
    q: "Comment reconnaître un livre sérieux sur ce sujet ?",
    a: "Vérifiez : des références bibliographiques en annexe, un auteur avec une formation journalistique ou académique, et un éditeur réputé. Les livres qui présentent chaque aspect comme absolument vrai sans admettre de contre-arguments sont généralement peu fiables.",
  },
];

export default function MeilleursLivresComplots() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("conspiracy"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 20);

  return (
    <BestOfPage
      title="Meilleurs Livres sur les Complots 2026"
      description="Les livres les plus lus sur les conspirations, les dissimulations et l'histoire cachée, fondés sur des faits et classés par avis lecteurs sur Amazon."
      books={books}
      breadcrumb="Théories du Complot"
      categoryPage="/category/conspiracy"
      categoryLabel="Complot"
      canonical="https://www.skriuwer.com/fr/meilleurs-livres-complots"
      reviewer="Auke & l'équipe Skriuwer"
      updatedDate="Avril 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
      locale="fr"
    />
  );
}
