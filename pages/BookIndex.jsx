import { bookService } from '../services/book.service.js';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';

const { useEffect, useState } = React;
const { useSearchParams } = ReactRouterDOM;
const { Link, Outlet, useNavigate } = ReactRouterDOM;

export function BookIndex() {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [books, setBooks] = useState(null);
   const [filterBy, setFilterBy] = useState(extractSearchParamFilter());

   useEffect(() => {
      _loadBooks();
   }, [filterBy]);

   async function _loadBooks() {
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
         navigate(`/book/${updatedBook.id}`);
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
         <button>
            <Link to="/book/edit">Add Book</Link>
         </button>
         <BookList books={books} onRemoveBook={onRemoveBook} />
         <Outlet context={{ onSave: onSave, books: books }} />
      </section>
   );
}
