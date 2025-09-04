import { BookPreview } from './BookPreview.jsx';

const { Link, useNavigate } = ReactRouterDOM;

export function BookList({ books, onRemoveBook, onEdit }) {
   const navigate = useNavigate();

   function _onEdit(bookId) {
      navigate(`/book/edit/${bookId}`);
   }

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
                  <button onClick={() => _onEdit(book.id)}>Edit</button>
               </section>
            </li>
         ))}
      </ul>
   );
}
