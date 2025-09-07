export function BookFilter({ filterBy, onSetFilterBy }) {
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
      onSetFilterBy({ [field]: value });
   }

   const { txt, maxPrice } = filterBy;
   return (
      <section className="book-filter">
         <h2>Filter Our Books</h2>
         <form>
            <label htmlFor="txt">Title/Description</label>
            <input onChange={handleChange} type="text" value={txt || ''} name="txt" id="txt" />

            <label htmlFor="maxPrice">Max Price</label>
            <input onChange={handleChange} type="number" value={maxPrice || ''} name="maxPrice" id="maxPrice" />
         </form>
      </section>
   );
}
