import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

   useEffect(() => {
      onSetFilterBy(filterByToEdit);
   }, [filterByToEdit]);

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
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
   }

   // function handleTxtChange({ target }) {
   //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: target.value }))
   // }

   // function handleMinSpeedChange({ target }) {
   //     setFilterByToEdit(prevFilter => ({ ...prevFilter, maxPrice: +target.value }))
   // }

   function onSubmitFilter(ev) {
      ev.preventDefault();
      onSetFilterBy(filterByToEdit);
   }

   const { txt, maxPrice } = filterByToEdit;
   return (
      <section className="book-filter">
         <h2>Filter Our Books</h2>
         <form onSubmit={onSubmitFilter}>
            <label htmlFor="txt">Title/Description</label>
            <input onChange={handleChange} type="text" value={txt} name="txt" id="txt" />

            <label htmlFor="maxPrice">Max Price</label>
            <input onChange={handleChange} type="number" value={maxPrice} name="maxPrice" id="maxPrice" />

            <button>Submit</button>
         </form>
      </section>
   );
}
