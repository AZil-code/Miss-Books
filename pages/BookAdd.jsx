import { bookService } from '../services/book.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { googleBookService } from '../services/googleBooks.service.js';
import { debounce } from '../services/util.service.js';
const { useState, useRef, useEffect } = React;

export function BookAdd() {
   const [searchStr, setSearchStr] = useState(null);
   const [books, setBooks] = useState(null);
   const searchStrDebounce = useRef(debounce(handleChange, 750)).current;

   useEffect(() => {
      if (searchStr) {
         googleBookService.fetchGoogleBooks(searchStr).then(setBooks);
      } else setBooks(null);
   }, [searchStr]);

   function handleChange({ target }) {
      setSearchStr(target.value || null);
   }

   function _onAdd(book) {
      bookService
         .addGoogleBook(book)
         .then((newBook) => showSuccessMsg(`Book added successfully! ${newBook.id}`))
         .catch((err) => showErrorMsg(err.message));
   }

   return (
      <section className="book-search-cotainer">
         <input name="search-string" onChange={searchStrDebounce}></input>
         <ul>
            {books &&
               books.map((book) => (
                  <li key={book.id}>
                     {book.volumeInfo.title}
                     <button className="add-book-btn" onClick={() => _onAdd(book)}>
                        +
                     </button>
                  </li>
               ))}
         </ul>
      </section>
   );
}
