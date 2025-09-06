import { AddReview } from '../cmps/AddReview.jsx';
import { LongTxt } from '../cmps/shared/LongTxt.jsx';
import { bookService } from '../services/book.service.js';
import { showSuccessMsg } from '../services/event-bus.service.js';

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
   const [book, setBook] = useState(null);
   const params = useParams();
   const navigate = useNavigate();
   const { bookId } = params;

   useEffect(() => {
      loadBook();
   }, [bookId]);

   async function loadBook() {
      try {
         const book = await bookService.get(bookId);
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

   function onReviewDelete(reviewId) {
      const upReviews = book.reviews.filter((review) => review.id !== reviewId);
      bookService.save({ ...book, reviews: upReviews }).then((updatedBook) => setBook(updatedBook));
      showSuccessMsg('Successfully removed review!');
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
         <AddReview bookId={bookId} setBook={setBook} />
         <section className="review-container">
            <h3>Reviews</h3>
            <ul>
               {book.reviews &&
                  book.reviews.map((review, index) => (
                     <i key={review.id}>
                        <h4>
                           {review.name} <span>{review.readAt}</span>
                        </h4>
                        <span>{'⭐'.repeat(review.rating)}</span>
                        <button onClick={() => onReviewDelete(review.id)}>Delete</button>
                     </i>
                  ))}
            </ul>
         </section>
      </section>
   );
}
