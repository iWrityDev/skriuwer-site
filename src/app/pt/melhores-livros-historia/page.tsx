import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros de História 2026 – Ordenados por avaliações de leitores",
  description: "Os melhores livros de história ordenados por número de avaliações verificadas da Amazon. Histórias que revelam o que os livros didáticos omitem.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-historia", languages: { en: "https://www.skriuwer.com/best-history-books", pt: "https://www.skriuwer.com/pt/melhores-livros-historia" } },
  openGraph: { title: "Melhores Livros de História 2026", description: "Os melhores livros de história ordenados por avaliações verificadas da Amazon.", url: "https://www.skriuwer.com/pt/melhores-livros-historia", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "A historiografia oficial é sempre uma escolha editorial. Os governos decidem o que entra nos livros didáticos. Os melhores livros de história vão além da narrativa dominante para revelar o que realmente aconteceu.",
  "Esta lista cobre história antiga, medieval e moderna. Todos ordenados por número de avaliações verificadas de leitores na Amazon.",
];

const FAQ = [
  { q: "Como escolher um bom livro de história?", a: "Prefira autores com formação acadêmica ou jornalística, livros com notas de rodapé e uma sólida bibliografia. Os livros que questionam a narrativa oficial com provas são geralmente mais confiáveis." },
  { q: "Estes livros são adequados para iniciantes?", a: "A maioria sim. Os livros mais bem avaliados são muitas vezes os que tornam a história acessível sem sacrificar o rigor. Um bom livro de história lê-se como um romance mas baseia-se em fatos documentados." },
  { q: "Há livros de história disponíveis em português?", a: "Sim. Vários títulos desta lista estão disponíveis em tradução portuguesa na Amazon. Verifique a disponibilidade em cada página de livro individual." },
  { q: "Que períodos históricos estão representados?", a: "Esta lista cobre um amplo espectro: Antiguidade, Idade Média, era moderna e história contemporânea. O ranking é determinado pelas avaliações dos leitores na Amazon." },
];

export default function MelhoresLivrosHistoria() {
  const books = getAllBooks().filter((b) => b.categories.includes("history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Melhores Livros de História 2026" description="Os livros de história mais lidos, ordenados por avaliações verificadas de leitores na Amazon." books={books} breadcrumb="Livros de História" categoryPage="/category/history" categoryLabel="História" canonical="https://www.skriuwer.com/pt/melhores-livros-historia" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
