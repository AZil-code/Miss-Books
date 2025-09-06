import { bookService } from '../services/book.service.js';
import { utilService, debounce } from '../services/util.service.js';

const { useState, useRef, useEffect } = React;
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM;

export function BookEdit() {
   const params = useParams(); // {bookId: ...}
   const navigate = useNavigate();
   const { onSave, books } = useOutletContext();
   const isEdit = utilService.isObjEmpty(params);
   const [newBook, setNewBook] = useState(
      isEdit ? books.find((book) => book.id === params.bookId) : bookService.getEmptyBook()
   );
   const onChangeDebounce = useRef(debounce(onChange, 400)).current;

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

   function onSaveBook(ev) {
      ev.preventDefault();
      onSave({ ...newBook });
   }

   function onBack() {
      navigate('/book');
   }

   const isSaveLocked = newBook.title === '' ? true : false;
   const saveButtonClass = isSaveLocked ? 'disabled' : '';

   return (
      <div className="modal-backdrop">
         <section onSubmit={onSaveBook} className="book-edit">
            <form className="modal-content">
               <h1>{isEdit ? 'Edit' : 'Add'} Book</h1>
               <label htmlFor="title">Title</label>
               <input type="text" name="title" id="title" defaultValue={newBook.title} onChange={onChangeDebounce} />

               <label htmlFor="listPrice.amount">Price</label>
               <input
                  type="number"
                  name="listPrice.amount"
                  id="listPrice.amount"
                  defaultValue={newBook.listPrice && newBook.listPrice.amount}
                  onChange={onChangeDebounce}
               />

               <label htmlFor="description">Description</label>
               <textarea
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={newBook.description}
                  onChange={onChangeDebounce}
               />

               <section className="btns flex">
                  <button className={saveButtonClass} type="submit" disabled={isSaveLocked}>
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
