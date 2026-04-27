import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros de História Sombria 2026 – O que os livros didáticos omitem",
  description: "Os melhores livros sobre história sombria: páginas ocultas, crimes esquecidos e o reverso da historiografia oficial. Ordenados por avaliações da Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-historia-sombria", languages: { en: "https://www.skriuwer.com/best-dark-history-books", pt: "https://www.skriuwer.com/pt/melhores-livros-historia-sombria" } },
  openGraph: { title: "Melhores Livros de História Sombria 2026", description: "Os melhores livros sobre o lado sombrio da história.", url: "https://www.skriuwer.com/pt/melhores-livros-historia-sombria", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "A historiografia oficial é sempre uma escolha. Os governos decidem o que entra nos livros didáticos. Muito do que realmente aconteceu é discretamente deixado de lado. Os livros de história sombria tratam precisamente dessas páginas omitidas.",
  "Os melhores autores neste campo trabalham com fontes e evitam o sensacionalismo. Explicam como aconteceu, quem sabia e por que ficou oculto por tanto tempo.",
];

const FAQ = [
  { q: "Qual é a diferença entre história sombria e história comum?", a: "Os livros de história comuns geralmente seguem a narrativa oficial. Os livros de história sombria focam no reverso: abuso de poder, segredos de Estado, crimes esquecidos e as pessoas excluídas da narrativa oficial." },
  { q: "Estes livros são baseados em fatos ou são sensacionalistas?", a: "Ambos os tipos estão presentes no ranking, mas os livros mais bem avaliados geralmente trabalham com fontes e notas de rodapé. Os leitores avaliam pior com o tempo os livros que se baseiam em suposições." },
  { q: "Quais temas são abordados?", a: "Entre outros: experimentos estatais em cidadãos não informados, assassinatos políticos, crimes coloniais, histórias de guerra ocultas e como a propaganda funciona." },
  { q: "Estes livros estão disponíveis em português?", a: "Alguns dos títulos recomendados estão disponíveis em tradução portuguesa na Amazon. Verifique a disponibilidade nas páginas individuais dos livros." },
];

export default function MelhoresLivrosHistoriaSombria() {
  const books = getAllBooks().filter((b) => b.categories.includes("dark-history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Melhores Livros de História Sombria 2026" description="Os livros mais lidos sobre história oculta, crimes esquecidos e o reverso da historiografia oficial, ordenados por avaliações da Amazon." books={books} breadcrumb="História Sombria" categoryPage="/category/dark-history" categoryLabel="História Sombria" canonical="https://www.skriuwer.com/pt/melhores-livros-historia-sombria" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
