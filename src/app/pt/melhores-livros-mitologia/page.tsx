import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros de Mitologia 2026 – Grega, Nórdica, Egípcia",
  description: "Os melhores livros de mitologia: deuses gregos, heróis nórdicos, cosmologia egípcia. Ordenados por avaliações verificadas da Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-mitologia", languages: { en: "https://www.skriuwer.com/best-mythology-books", pt: "https://www.skriuwer.com/pt/melhores-livros-mitologia" } },
  openGraph: { title: "Melhores Livros de Mitologia 2026", description: "Os melhores livros de mitologia: deuses gregos, heróis nórdicos, cosmologia egípcia.", url: "https://www.skriuwer.com/pt/melhores-livros-mitologia", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "A mitologia não é literatura infantil. São as histórias com as quais as civilizações tentavam responder perguntas que a ciência ainda não conseguia responder: por que o mal existe, o que acontece após a morte, por que os homens são tão cruéis entre si? Os deuses são humanos, complexos e frequentemente decepcionantes.",
  "Os livros desta página cobrem todo o espectro: desde textos acadêmicos sobre as fontes originais até adaptações modernas cativantes acessíveis sem conhecimento prévio.",
];

const FAQ = [
  { q: "Por onde começar se sou novo na mitologia?", a: "Comece com uma adaptação moderna em prosa acessível antes de abordar os textos originais. A mitologia grega é um bom ponto de partida, pois muitas histórias já são conhecidas da cultura popular." },
  { q: "Qual é a diferença entre mitologia grega e nórdica?", a: "A mitologia grega gira em torno das fraquezas humanas e dos caprichos dos deuses. A mitologia nórdica tem um tom mais sombrio: os próprios deuses morrerão no Ragnarök, e sabem disso." },
  { q: "Há bons livros de mitologia em português?", a: "Sim, tanto traduções de livros modernos quanto edições da Edda original estão disponíveis em português na Amazon. Verifique a disponibilidade nas páginas dos livros individuais." },
  { q: "Quais mitologias estão representadas?", a: "Grega, nórdica, egípcia, romana, celta e mais. O ranking é determinado pelo número de avaliações de leitores na Amazon." },
];

export default function MelhoresLivrosMitologia() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Melhores Livros de Mitologia 2026" description="Os livros de mitologia mais lidos — grega, nórdica, egípcia e mais — ordenados por avaliações de leitores na Amazon." books={books} breadcrumb="Livros de Mitologia" categoryPage="/category/mythology" categoryLabel="Mitologia" canonical="https://www.skriuwer.com/pt/melhores-livros-mitologia" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
