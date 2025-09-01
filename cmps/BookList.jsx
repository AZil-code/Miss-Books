import { BookPreview } from './BookPreview.jsx';

const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook, onEdit }) {
   return (
      <ul className="book-list">
         {books.map((book) => (
            <li key={book.id}>
               <BookPreview book={book} />
               <section>
                  <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                  <button>
                     <Link to={`/book/${book.id}`}>Details</Link>{' '}
                  </button>
                  <button onClick={() => onEdit(book)}>Edit</button>
               </section>
            </li>
         ))}
      </ul>
   );
}
