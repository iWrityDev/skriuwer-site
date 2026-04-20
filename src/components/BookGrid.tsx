import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";

export function BookGrid({
  books,
  columns = 4,
}: {
  books: Book[];
  columns?: 3 | 4 | 5;
}) {
  const gridClass = {
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  }[columns];

  return (
    <div className={`book-grid grid ${gridClass} gap-4`}>
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  );
}
