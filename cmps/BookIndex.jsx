import { bookService } from '../services/book.service.js';
import { BookFilter } from './BookFilter.jsx';
import { BookList } from './BookList.jsx';

const { useEffect, useState } = React;

export function BookIndex() {
   const [books, setBooks] = useState(null);
   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

   useEffect(() => {
      loadBooks();
   }, [filterBy]);

   async function loadBooks() {
      try {
         const books = await bookService.query(filterBy);
         setBooks(books);
      } catch (error) {
         console.error('Failed to fetch books: ' + error);
      }
   }

   async function onRemoveBook(bookId) {
      try {
         await bookService.remove(bookId);
         setBooks((books) => books.filter((book) => book.id !== bookId));
      } catch (error) {
         console.error('Failed removing book: ', error);
      }
   }

   function onSetFilterBy(filterBy) {
      setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
   }

   if (!books) return <div>Loading...</div>;

   return (
      <section className="book-index">
         <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
         <BookList books={books} onRemoveBook={onRemoveBook} />
      </section>
   );
}
