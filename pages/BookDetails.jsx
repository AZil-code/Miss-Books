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

   console.log('Render');
   return (
      <section className="book-details">
         <h1>Book Name: {book.title}</h1>
         <h1>Book Price: {book.listPrice.amount}</h1>
         {/* <p>{book.description}</p> */}
         <LongTxt txt={book.description} />
         <img src={`../assets/img/${book.vendor}.png`} alt="book-image" />
         <button onClick={onBack}>Back</button>
         <section>
            <button>
               <Link to={`/book/${book.prevBookId}`}>Prev</Link>
            </button>
            <button>
               <Link to={`/book/${book.nextBookId}`}>Next</Link>
            </button>
         </section>
      </section>
   );
}
