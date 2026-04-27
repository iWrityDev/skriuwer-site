import type { Metadata } from "next";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Recomendações de Livros 2026 – Os melhores livros para leitores curiosos",
  description: "Os melhores livros de história, mitologia, história sombria e conspirações, ordenados por avaliações reais da Amazon. Seleção independente da Skriuwer.",
  alternates: {
    canonical: "https://www.skriuwer.com/pt",
    languages: {
      en: "https://www.skriuwer.com",
      de: "https://www.skriuwer.com/de",
      nl: "https://www.skriuwer.com/nl",
      fr: "https://www.skriuwer.com/fr",
      es: "https://www.skriuwer.com/es",
      it: "https://www.skriuwer.com/it",
      pt: "https://www.skriuwer.com/pt",
    },
  },
  openGraph: {
    title: "Recomendações de Livros 2026 – Os melhores livros para leitores curiosos",
    description: "Os melhores livros de história, mitologia, história sombria e conspirações, ordenados por avaliações reais da Amazon.",
    url: "https://www.skriuwer.com/pt",
    type: "website",
    locale: "pt_BR",
  },
};

const CATEGORIES = [
  { label: "História", href: "/pt/melhores-livros-historia", desc: "Os livros de história mais lidos" },
  { label: "Mitologia", href: "/pt/melhores-livros-mitologia", desc: "Grega, nórdica, egípcia e mais" },
  { label: "História Sombria", href: "/pt/melhores-livros-historia-sombria", desc: "O que os livros didáticos omitem" },
  { label: "Conspirações", href: "/pt/melhores-livros-conspiracoes", desc: "Fatos por trás dos mitos" },
  { label: "Mitologia Nórdica", href: "/pt/melhores-livros-mitologia-nordica", desc: "Odin, Thor, Ragnarök" },
  { label: "Livros em Português", href: "/pt/melhores-livros-em-portugues", desc: "As melhores edições em português" },
];

export default function PtHomePage() {
  const topBooks = getAllBooks()
    .filter((b) => b.categories.some((c) => ["history", "mythology", "dark-history", "conspiracy"].includes(c)))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <div>
      <section className="hero-glow-cat">
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ backgroundImage: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
            Os melhores livros,<br />avaliados pelos leitores
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Listas de livros selecionadas sobre história, mitologia, história sombria e mais — ordenadas por avaliações verificadas de leitores na Amazon.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/pt/melhores-livros-historia" className="px-5 py-2.5 rounded-lg bg-[var(--color-orange)] text-white font-semibold hover:bg-[var(--color-orange-light)] transition text-sm">
              Explorar livros de história
            </Link>
            <Link href="/books" className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange-light)] transition text-sm">
              Ver todos os livros
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Explorar por categoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href}
              className="group p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange-light)] transition-all hover:-translate-y-0.5 bg-[var(--color-surface)]">
              <div className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-orange-light)] transition text-sm mb-1">{cat.label}</div>
              <div className="text-xs text-[var(--color-text-dim)]">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Os mais avaliados agora</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topBooks.map((book) => {
            const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;
            const cover = book.coverImageFallback?.startsWith("http") ? book.coverImageFallback : book.coverImage;
            return (
              <div key={book.slug} className="flex flex-col rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)] hover:-translate-y-0.5 transition-all">
                {cover?.startsWith("http") && (
                  <div className="w-full h-40 bg-[var(--color-surface-light)] flex items-center justify-center overflow-hidden">
                    <img src={cover} alt={book.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-3 flex flex-col flex-1">
                  <Link href={`/books/${book.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-orange-light)] text-sm line-clamp-2 leading-snug mb-1">
                    {book.title}
                  </Link>
                  <p className="text-xs text-[var(--color-text-dim)] mb-2">{book.author}</p>
                  {amazonUrl && (
                    <a href={amazonUrl} target="_blank" rel="noopener noreferrer nofollow sponsored"
                      className="mt-auto text-center px-3 py-1.5 rounded bg-[var(--color-orange)] text-white text-xs font-bold hover:bg-[var(--color-orange-light)] transition">
                      Comprar na Amazon →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Sobre a Skriuwer</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            Skriuwer é um site independente de recomendações de livros da Frísia, Países Baixos. Todas as listas são ordenadas pelo número de avaliações verificadas de leitores na Amazon, não por orçamento publicitário. Sem listas patrocinadas, sem enchimento.
          </p>
        </div>
      </section>
    </div>
  );
}
