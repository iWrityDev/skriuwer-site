import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros em Português 2026 – Ordenados por avaliações de leitores",
  description: "Os melhores livros disponíveis em português: história, mitologia, história sombria e mais. Ordenados por avaliações verificadas da Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-em-portugues", languages: { en: "https://www.skriuwer.com/best-books-in-portuguese", pt: "https://www.skriuwer.com/pt/melhores-livros-em-portugues" } },
  openGraph: { title: "Melhores Livros em Português 2026", description: "Os melhores livros disponíveis em português: história, mitologia, história sombria e mais.", url: "https://www.skriuwer.com/pt/melhores-livros-em-portugues", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "Esta página reúne os livros mais populares disponíveis em português, sejam obras originais em português ou traduções. Livros informativos sobre história e história sombria, contos bilíngues para estudantes de idiomas e títulos sobre mitologia e teorias da conspiração.",
  "Todos os livros são ordenados por número de avaliações verificadas de leitores na Amazon. Isso significa que os livros no topo são os que mais pessoas realmente leram e avaliaram, não os que têm o maior orçamento publicitário.",
];

const FAQ = [
  { q: "Quais livros em português são mais populares entre os leitores?", a: "Livros informativos em português sobre história, história sombria e relatos de sobrevivência são especialmente procurados. Nesta página os livros são ordenados por número de avaliações na Amazon." },
  { q: "Há livros bilíngues disponíveis em português?", a: "Sim, esta página inclui uma seleção de contos curtos bilíngues para falantes de português que querem aprender um novo idioma. Verifique a disponibilidade nas páginas individuais dos livros." },
  { q: "Estes livros estão disponíveis fora do Brasil/Portugal?", a: "Sim. Todos os livros estão vinculados à Amazon, que entrega internacionalmente. Os links nas páginas individuais dos livros levam à Amazon BR, PT, DE, UK e US." },
  { q: "Quais categorias estão disponíveis em português?", a: "História, história sombria, aprendizado de idiomas (contos bilíngues) e crime real são as categorias em português mais sólidas nesta página. Novos títulos são adicionados regularmente." },
];

export default function MelhoresLivrosEmPortugues() {
  const books = getAllBooks().filter((b) => b.language === "pt").sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Melhores Livros em Português 2026" description="Os melhores títulos disponíveis em português: história, história sombria, contos bilíngues e mais. Ordenados por avaliações de leitores na Amazon." books={books} breadcrumb="Livros em Português" categoryPage="/category/language-learning" categoryLabel="Aprendizado de Idiomas" canonical="https://www.skriuwer.com/pt/melhores-livros-em-portugues" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
