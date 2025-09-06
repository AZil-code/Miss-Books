import { bookService } from '../services/book.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { debounce } from '../services/util.service.js';

const { useRef, useState } = React;

export function AddReview({ bookId, setBook }) {
   const [review, setReview] = useState({});
   const handleChangeDebounce = useRef(debounce(handleChange, 500)).current;

   function handleChange({ target }) {
      let { value, name: field } = target;
      switch (target.type) {
         case 'range':
         case 'number':
            value = +target.value || '';
            break;
         case 'checkbox':
            value = target.checked;
            break;
      }
      setReview((prev) => ({ ...prev, [field]: value }));
   }

   function onSubmit(ev) {
      ev.preventDefault();
      bookService
         .addReview(bookId, review)
         .then((updatedBook) => {
            setBook((prev) => ({ ...prev, ...updatedBook }));
            showSuccessMsg('Review added successfully!');
            ev.target.reset();
            setReview({});
         })
         .catch((err) => {
            showErrorMsg('Error on review creation!');
            console.error(`Failed to add review: ${err}`);
         });
   }

   const isSaveLocked = review.rating ? false : true;
   const saveButtonClass = isSaveLocked ? 'disabled' : '';

   return (
      <section className="add-review" onSubmit={onSubmit}>
         <form>
            <h3>Add Review</h3>

            <label htmlFor="name" id="name">
               Full Name
            </label>
            <input type="text" name="name" onChange={handleChangeDebounce} />

            <label htmlFor="rating" id="rating">
               Rating
            </label>
            <select name="rating" onChange={handleChange} value={review.rating}>
               <option value="">Select Rating</option>
               <option value="5">5</option>
               <option value="4">4</option>
               <option value="3">3</option>
               <option value="2">2</option>
               <option value="1">1</option>
            </select>

            <label htmlFor="readAt">Read At</label>
            <input type="date" name="readAt" onChange={handleChangeDebounce} />

            <button type="submit" disabled={isSaveLocked} className={saveButtonClass}>
               Submit Review
            </button>
         </form>
      </section>
   );
}
