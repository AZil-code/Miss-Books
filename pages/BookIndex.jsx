import { bookService } from '../services/book.service.js';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { BookEdit } from './BookEdit.jsx';

const { useEffect, useState } = React;
const { useSearchParams } = ReactRouterDOM;

export function BookIndex() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [books, setBooks] = useState([]);
   const [filterBy, setFilterBy] = useState(extractSearchParamFilter());
   // const [isEditOpen, setIsEditOpen] = useState(false);
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
      updateSearchParams(filterBy);
      setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
   }

   function onEdit(book) {
      // setIsEditOpen(true);
      setBookToEdit(book);
   }

   function onBack() {
      // setIsEditOpen(false);
      setBookToEdit(null);
   }

   async function onSave(newBook) {
      try {
         const isNew = newBook.id ? false : true;
         const updatedBook = await bookService.save(newBook);
         setBooks((prevBooks) => {
            if (!isNew) {
               const index = prevBooks.findIndex((book) => book.id === updatedBook.id);
               prevBooks[index] = updatedBook;
               return prevBooks;
            } else {
               prevBooks.push(updatedBook);
               return prevBooks;
            }
         });
         setBookToEdit(null);
         // setIsEditOpen(false);
      } catch (error) {
         console.error('Failed saving book: ', error);
      }
   }

   function extractSearchParamFilter() {
      return {
         txt: searchParams.get('txt'),
         maxPrice: searchParams.get('maxPrice'),
      };
   }

   function updateSearchParams(filterBy) {
      const newParams = {};
      if (filterBy.txt) newParams.txt = filterBy.txt;
      if (filterBy.maxPrice) newParams.maxPrice = filterBy.maxPrice;
      setSearchParams(newParams);
   }

   if (!books) return <div>Loading...</div>;

   return (
      <section className="book-index">
         <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
         <button onClick={() => onEdit({})}>Add Book</button>
         <BookList books={books} onRemoveBook={onRemoveBook} onEdit={onEdit} />
         {bookToEdit && <BookEdit onBack={onBack} book={bookToEdit} onSave={onSave} />}
      </section>
   );
}
