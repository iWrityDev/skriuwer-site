import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros de Historia Oscura 2026 – Lo que los libros de texto omiten",
  description: "Los mejores libros sobre historia oscura: páginas ocultas, crímenes olvidados y el reverso de la historiografía oficial. Ordenados por valoraciones de Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/es/mejores-libros-historia-oscura", languages: { en: "https://www.skriuwer.com/best-dark-history-books", es: "https://www.skriuwer.com/es/mejores-libros-historia-oscura" } },
  openGraph: { title: "Mejores Libros de Historia Oscura 2026", description: "Los mejores libros sobre el lado oscuro de la historia.", url: "https://www.skriuwer.com/es/mejores-libros-historia-oscura", type: "website", locale: "es_ES" },
};

const INTRO = [
  "La historiografía oficial siempre es una elección. Los gobiernos deciden qué entra en los libros de texto. Mucho de lo que realmente ocurrió se deja discretamente de lado. Los libros de historia oscura tratan precisamente sobre esas páginas omitidas.",
  "Los mejores autores en este campo trabajan con fuentes y evitan el sensacionalismo. Explican cómo ocurrió, quién lo sabía y por qué permaneció oculto tanto tiempo.",
];

const FAQ = [
  { q: "¿Cuál es la diferencia entre historia oscura e historia ordinaria?", a: "Los libros de historia ordinarios suelen seguir el relato oficial. Los libros de historia oscura se centran en el reverso: abuso de poder, secretos de Estado, crímenes olvidados y las personas excluidas del relato oficial." },
  { q: "¿Estos libros están respaldados por hechos o son sensacionalistas?", a: "Ambos tipos están presentes en el ranking, pero los libros mejor valorados generalmente trabajan con fuentes y notas al pie. Los lectores puntúan peor con el tiempo los libros que se basan en suposiciones." },
  { q: "¿Qué temas se abordan?", a: "Entre otros: experimentos estatales en ciudadanos no informados, asesinatos políticos, crímenes coloniales, historias de guerra ocultas y cómo funciona la propaganda." },
  { q: "¿Estos libros están disponibles en español?", a: "Algunos de los títulos recomendados están disponibles en traducción española en Amazon. Consulte la disponibilidad en las páginas individuales de los libros." },
];

export default function MejoresLibrosHistoriaOscura() {
  const books = getAllBooks().filter((b) => b.categories.includes("dark-history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Mejores Libros de Historia Oscura 2026" description="Los libros más leídos sobre historia oculta, crímenes olvidados y el reverso de la historiografía oficial, ordenados por valoraciones de Amazon." books={books} breadcrumb="Historia Oscura" categoryPage="/category/dark-history" categoryLabel="Historia Oscura" canonical="https://www.skriuwer.com/es/mejores-libros-historia-oscura" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
