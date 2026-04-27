import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros de Conspiraciones 2026 – Hechos detrás de los mitos",
  description: "Los mejores libros sobre teorías de conspiración, encubrimientos e historia oculta. Ordenados por valoraciones verificadas de lectores en Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/es/mejores-libros-conspiraciones", languages: { en: "https://www.skriuwer.com/best-conspiracy-books", es: "https://www.skriuwer.com/es/mejores-libros-conspiraciones" } },
  openGraph: { title: "Mejores Libros de Conspiraciones 2026", description: "Los mejores libros sobre teorías de conspiración, encubrimientos e historia oculta.", url: "https://www.skriuwer.com/es/mejores-libros-conspiraciones", type: "website", locale: "es_ES" },
};

const INTRO = [
  "No todas las teorías de conspiración son falsas, y no todas son verdaderas. Los mejores libros sobre este tema separan los hechos demostrables de la especulación, examinan los verdaderos encubrimientos de gobiernos y empresas y muestran cómo funciona la desinformación.",
  "Esta lista incluye tanto libros que documentan conspiraciones históricas reales como libros que tratan de manera crítica las teorías populares. Todos ordenados por número de valoraciones verificadas de lectores en Amazon.",
];

const FAQ = [
  { q: "¿Cuál es la diferencia entre una conspiración real y una teoría de conspiración?", a: "Una conspiración real es un complot secreto demostrable (como MKUltra, Watergate o las campañas de la industria tabacalera de los años 60). Una teoría de conspiración es una afirmación inverificable sobre un poder secreto." },
  { q: "¿Estos libros son serios o sensacionalistas?", a: "Ambos están representados en el ranking, pero los libros mejor valorados generalmente trabajan con fuentes. Los libros que se basan únicamente en suposiciones son peor valorados por los lectores con el tiempo." },
  { q: "¿Qué conspiraciones reales se abordan?", a: "Entre otras: experimentos de la CIA con LSD en sujetos no informados, programas de vigilancia estatal, manipulación de elecciones, supresión de investigaciones médicas y varios asesinatos políticos." },
  { q: "¿Cómo reconocer un libro serio sobre este tema?", a: "Busque: referencias bibliográficas en el apéndice, un autor con formación periodística o académica, y una editorial de reputación. Los libros que presentan cada aspecto como absolutamente verdadero sin admitir contraargumentos son generalmente poco fiables." },
];

export default function MejoresLibrosConspiraciones() {
  const books = getAllBooks().filter((b) => b.categories.includes("conspiracy")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Mejores Libros de Conspiraciones 2026" description="Los libros más leídos sobre conspiraciones, encubrimientos e historia oculta, ordenados por valoraciones en Amazon." books={books} breadcrumb="Conspiraciones" categoryPage="/category/conspiracy" categoryLabel="Conspiraciones" canonical="https://www.skriuwer.com/es/mejores-libros-conspiraciones" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
