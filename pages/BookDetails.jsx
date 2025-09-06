import { AddReview } from '../cmps/AddReview.jsx';
import { LongTxt } from '../cmps/LongTxt.jsx';
import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
   const [book, setBook] = useState(null);
   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      loadBook();
   }, [params.bookId]);

   async function loadBook() {
      try {
         const book = await bookService.get(params.bookId);
         setBook(book);
      } catch (error) {
         console.log('err:', err);
      }
   }

   if (!book) return <div>Loading...</div>;

   function onBack() {
      navigate('/book');
      // navigate(-1)
   }

   const price = book.listPrice ? book.listPrice.amount : 'Not determined';

   return (
      <section className="book-details">
         <h1>Book Name: {book.title}</h1>
         <h1>Book Price: {price}</h1>
         {book.description && <LongTxt txt={book.description} />}
         <img src={`../assets/img/${book.vendor}.png`} alt="book-image" />
         <button onClick={onBack}>Back</button>
         <section>
            <button>
               <Link to={`/book/${book.prevBookId}`}>Prev</Link>
            </button>
            <button>
               <Link to={`/book/${book.nextBookId}`}>Next</Link>
            </button>
            <span>{`${book.index + 1}/${book.totalBooks}`}</span>
         </section>
         <AddReview />
      </section>
   );
}
