import { debounce } from '../services/util.service.js';
const { useRef } = React;

export function AddReview() {
   const review = {};
   const handleChangeDebounce = useRef(debounce(handleChange, 500)).current;

   function handleChange({ target }) {
      let { value, name: field } = target;
      switch (target.type) {
         case 'range':
         case 'number':
            value = +target.value;
            break;
         case 'checkbox':
            value = target.checked;
            break;
      }
      review[field] = value;
   }

   function onSubmit(ev) {
      //    Send request to db
      ev.preventDefault();
      console.log(review);
   }

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
            <select name="rating" onChange={handleChange}>
               <option value="5">5</option>
               <option value="4">4</option>
               <option value="3">3</option>
               <option value="2">2</option>
               <option value="1">1</option>
            </select>

            <label htmlFor="readAt">Read At</label>
            <input type="date" name="readAt" onChange={handleChangeDebounce} />

            <button type="submit">Submit Review</button>
         </form>
      </section>
   );
}
