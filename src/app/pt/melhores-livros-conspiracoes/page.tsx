import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros sobre Conspirações 2026 – Fatos por trás dos mitos",
  description: "Os melhores livros sobre teorias da conspiração, encobrimentos e história oculta. Ordenados por avaliações verificadas de leitores na Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-conspiracoes", languages: { en: "https://www.skriuwer.com/best-conspiracy-books", pt: "https://www.skriuwer.com/pt/melhores-livros-conspiracoes" } },
  openGraph: { title: "Melhores Livros sobre Conspirações 2026", description: "Os melhores livros sobre teorias da conspiração, encobrimentos e história oculta.", url: "https://www.skriuwer.com/pt/melhores-livros-conspiracoes", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "Nem todas as teorias da conspiração são falsas, e nem todas são verdadeiras. Os melhores livros sobre este assunto separam os fatos demonstráveis da especulação, examinam os verdadeiros encobrimentos de governos e empresas e mostram como a desinformação funciona.",
  "Esta lista inclui tanto livros que documentam conspirações históricas reais quanto livros que tratam criticamente as teorias populares. Todos ordenados por número de avaliações verificadas de leitores na Amazon.",
];

const FAQ = [
  { q: "Qual é a diferença entre uma conspiração real e uma teoria da conspiração?", a: "Uma conspiração real é um complô secreto demonstrável (como MKUltra, Watergate ou as campanhas da indústria do tabaco dos anos 60). Uma teoria da conspiração é uma afirmação inverificável sobre um poder secreto." },
  { q: "Estes livros são sérios ou sensacionalistas?", a: "Ambos estão representados no ranking, mas os livros mais bem avaliados geralmente trabalham com fontes. Os livros que se baseiam apenas em suposições são avaliados pior pelos leitores ao longo do tempo." },
  { q: "Quais conspirações reais são abordadas?", a: "Entre outras: experimentos da CIA com LSD em sujeitos não informados, programas de vigilância estatal, manipulação de eleições, supressão de pesquisas médicas e vários assassinatos políticos." },
  { q: "Como reconhecer um livro sério sobre este assunto?", a: "Procure: referências bibliográficas no apêndice, um autor com formação jornalística ou acadêmica, e uma editora de reputação." },
];

export default function MelhoresLivrosConspiracoes() {
  const books = getAllBooks().filter((b) => b.categories.includes("conspiracy")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Melhores Livros sobre Conspirações 2026" description="Os livros mais lidos sobre conspirações, encobrimentos e história oculta, ordenados por avaliações na Amazon." books={books} breadcrumb="Conspirações" categoryPage="/category/conspiracy" categoryLabel="Conspirações" canonical="https://www.skriuwer.com/pt/melhores-livros-conspiracoes" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
