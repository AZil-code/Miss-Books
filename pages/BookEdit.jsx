import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React;

export function BookEdit({ book, onBack, onSave }) {
   const isEdit = book ? true : false;
   const newBook = book;

   function onChange(ev) {
      let fieldName = ev.target.name;
      let obj = newBook;
      while (fieldName.includes('.')) {
         const dotInd = fieldName.indexOf('.');
         obj = obj[fieldName.slice(0, dotInd)];
         fieldName = fieldName.slice(dotInd + 1);
      }
      obj[fieldName] = ev.target.value;
   }

   return (
      // <section onSubmit={onSaveBook} className="book-edit">
      <div className="modal-backdrop">
         <section className="book-edit modal-content">
            <h1>{isEdit ? 'Edit' : 'Add'} Book</h1>
            <form>
               <label htmlFor="title">Title</label>
               <input type="text" name="title" id="title" defaultValue={book.title} onChange={onChange} />

               <label htmlFor="listPrice.amount">Amount</label>
               <input
                  type="number"
                  name="listPrice.amount"
                  id="listPrice.amount"
                  defaultValue={book.listPrice.amount}
                  onChange={onChange}
               />
               <section className="btns flex">
                  <button
                     onClick={(ev) => {
                        ev.preventDefault();
                        onSave({ ...book, ...newBook });
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
