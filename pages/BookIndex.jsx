import { bookService } from '../services/book.service.js';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { BookEdit } from './BookEdit.jsx';

const { useEffect, useState } = React;

export function BookIndex() {
   const [books, setBooks] = useState([]);
   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [bookToEdit, setBookToEdit] = useState(null);

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

   function onEdit(book) {
      setIsEditOpen(true);
      setBookToEdit(book);
   }

   function onBack() {
      setIsEditOpen(false);
      setBookToEdit(null);
   }

   async function onSave(newBook) {
      try {
         const updatedBook = await bookService.save(newBook);
         setBooks((prevBooks) => {
            const index = prevBooks.findIndex((book) => book.id === updatedBook.id);
            prevBooks[index] = updatedBook;
            return prevBooks;
         });
         setBookToEdit(null);
         setIsEditOpen(false);
      } catch (error) {
         console.error('Failed saving book: ', error);
      }
   }

   if (!books) return <div>Loading...</div>;

   return (
      <section className="book-index">
         <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
         <BookList books={books} onRemoveBook={onRemoveBook} onEdit={onEdit} />
         {isEditOpen && <BookEdit onBack={onBack} book={bookToEdit} onSave={onSave} />}
      </section>
   );
}
