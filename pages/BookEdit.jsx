import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';

const { useState } = React;
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM;

export function BookEdit() {
   const params = useParams(); // {bookId: ...}
   const navigate = useNavigate();
   const { onSave, books } = useOutletContext();
   const isEdit = utilService.isObjEmpty(params);
   const [newBook, setNewBook] = useState(
      isEdit ? books.find((book) => book.id === params.bookId) : bookService.getEmptyBook()
   );

   console.log(newBook);

   function onChange(ev) {
      let fieldName = ev.target.name;
      let obj = newBook;
      while (fieldName.includes('.')) {
         const dotInd = fieldName.indexOf('.');
         obj = obj[fieldName.slice(0, dotInd)];
         fieldName = fieldName.slice(dotInd + 1);
      }
      obj[fieldName] = ev.target.value;
      setNewBook((prevBook) => ({ ...prevBook, ...obj }));
   }

   function onBack() {
      navigate('/book');
   }

   const isSaveLocked = newBook.title === '' ? true : false;

   return (
      // <section onSubmit={onSaveBook} className="book-edit">
      <div className="modal-backdrop">
         <section className="book-edit">
            <form className="modal-content">
               <h1>{isEdit ? 'Edit' : 'Add'} Book</h1>
               <label htmlFor="title">Title</label>
               <input type="text" name="title" id="title" defaultValue={newBook.title} onChange={onChange} />

               <label htmlFor="listPrice.amount">Amount</label>
               <input
                  type="number"
                  name="listPrice.amount"
                  id="listPrice.amount"
                  defaultValue={newBook.listPrice && newBook.listPrice.amount}
                  onChange={onChange}
               />

               <label htmlFor="description">Description</label>
               <textarea
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={newBook.description}
                  onChange={onChange}
               />

               <section className="btns flex">
                  <button
                     disabled={isSaveLocked}
                     onClick={(ev) => {
                        ev.preventDefault();
                        onSave({ ...newBook });
                     }}
                  >
                     Save
                  </button>
                  <button type="button" className="back-btn" onClick={onBack}>
                     Back
                  </button>
               </section>
            </form>
         </section>
      </div>
   );
}
