import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Melhores Livros de Mitologia Nórdica 2026 – Odin, Thor, Ragnarök",
  description: "Os melhores livros sobre mitologia nórdica: vikings, deuses, o fim do mundo. Para iniciantes e conhecedores. Ordenados por avaliações verificadas da Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/pt/melhores-livros-mitologia-nordica", languages: { en: "https://www.skriuwer.com/best-norse-mythology-books", pt: "https://www.skriuwer.com/pt/melhores-livros-mitologia-nordica" } },
  openGraph: { title: "Melhores Livros de Mitologia Nórdica 2026", description: "Os melhores livros sobre mitologia nórdica: vikings, deuses, o fim do mundo.", url: "https://www.skriuwer.com/pt/melhores-livros-mitologia-nordica", type: "website", locale: "pt_BR" },
};

const INTRO = [
  "A mitologia nórdica é mais sombria que a grega. Aqui os próprios deuses morrerão. Odin sabe disso, prepara-se e luta assim mesmo. Essa atitude — coragem diante de um fim certo — moldou a cultura viking e fascina leitores do mundo inteiro até hoje.",
  "Os livros desta página cobrem todo o espectro: desde textos acadêmicos sobre a Edda original até adaptações modernas cativantes acessíveis sem conhecimento prévio.",
];

const FAQ = [
  { q: "Qual é a melhor introdução à mitologia nórdica?", a: "Para iniciantes recomenda-se começar com adaptações modernas em prosa acessível antes de se debruçar sobre a Prosa Edda ou a Edda Poética. As fontes primárias requerem algum conhecimento contextual." },
  { q: "O que é o Ragnarök e por que é tão importante?", a: "O Ragnarök é o fim do mundo na mitologia nórdica: uma batalha final em que quase todos os deuses e monstros perecem. O que torna o Ragnarök especial: é previsto, inevitável, e os deuses se preparam para ele assim mesmo." },
  { q: "Em que a mitologia nórdica difere da versão cinematográfica (Marvel)?", a: "Consideravelmente. Loki na Edda não é um anti-herói heroico, mas um trickster complexo que eventualmente escolhe o mal. Thor é menos eloquente e muito mais brutal." },
  { q: "Há livros de mitologia nórdica disponíveis em português?", a: "Sim. Traduções de livros modernos e edições da Edda original estão disponíveis em português na Amazon. Verifique a disponibilidade nas páginas dos livros individuais." },
];

export default function MelhoresLivrosMitologiaNordica() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology") && (b.title.toLowerCase().includes("norse") || b.title.toLowerCase().includes("viking") || b.title.toLowerCase().includes("odin") || b.title.toLowerCase().includes("thor") || b.title.toLowerCase().includes("nordic") || b.description?.toLowerCase().includes("norse") || b.description?.toLowerCase().includes("viking"))).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 15);
  return <BestOfPage title="Melhores Livros de Mitologia Nórdica 2026" description="Os livros mais lidos sobre vikings, deuses e Ragnarök, das introduções aos textos originais. Ordenados por avaliações na Amazon." books={books} breadcrumb="Mitologia Nórdica" categoryPage="/category/mythology" categoryLabel="Mitologia" canonical="https://www.skriuwer.com/pt/melhores-livros-mitologia-nordica" reviewer="Auke & a equipe Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="pt" />;
}
