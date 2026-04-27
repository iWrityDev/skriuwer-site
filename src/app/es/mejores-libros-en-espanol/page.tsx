import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros en Español 2026 – Ordenados por valoraciones de lectores",
  description: "Los mejores libros disponibles en español: historia, mitología, historia oscura y más. Ordenados por valoraciones verificadas de Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/es/mejores-libros-en-espanol", languages: { en: "https://www.skriuwer.com/best-books-in-spanish", es: "https://www.skriuwer.com/es/mejores-libros-en-espanol" } },
  openGraph: { title: "Mejores Libros en Español 2026", description: "Los mejores libros disponibles en español: historia, mitología, historia oscura y más.", url: "https://www.skriuwer.com/es/mejores-libros-en-espanol", type: "website", locale: "es_ES" },
};

const INTRO = [
  "Esta página reúne los libros más populares disponibles en español, ya sean obras originales en castellano o traducciones. Libros informativos sobre historia y historia oscura, relatos bilingües para estudiantes de idiomas y títulos sobre mitología y teorías de conspiración.",
  "Todos los libros están ordenados por número de valoraciones verificadas de lectores en Amazon. Eso significa que los libros en la parte superior son los que más personas han leído y valorado realmente, no los que tienen el mayor presupuesto publicitario.",
];

const FAQ = [
  { q: "¿Qué libros en español son los más populares entre los lectores?", a: "Los libros informativos en español sobre historia, historia oscura y relatos de supervivencia son especialmente solicitados. En esta página los libros se ordenan por número de valoraciones en Amazon." },
  { q: "¿Hay libros bilingües disponibles en español?", a: "Sí, esta página incluye una selección de relatos cortos bilingües para hispanohablantes que quieren aprender un nuevo idioma. Consulte la disponibilidad en las páginas individuales de los libros." },
  { q: "¿Estos libros están disponibles fuera de España?", a: "Sí. Todos los libros enlazan a Amazon, que realiza envíos internacionales. Los enlaces en las páginas individuales llevan a Amazon ES, DE, UK y US." },
  { q: "¿Qué categorías están disponibles en español?", a: "Historia, historia oscura, aprendizaje de idiomas (relatos bilingües) y crimen real son las categorías en español más sólidas en esta página. Se añaden nuevos títulos regularmente." },
];

export default function MejoresLibrosEnEspanol() {
  const books = getAllBooks().filter((b) => b.language === "es").sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Mejores Libros en Español 2026" description="Los mejores títulos disponibles en español: historia, historia oscura, relatos bilingües y más. Ordenados por valoraciones en Amazon." books={books} breadcrumb="Libros en Español" categoryPage="/category/language-learning" categoryLabel="Aprendizaje de Idiomas" canonical="https://www.skriuwer.com/es/mejores-libros-en-espanol" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
