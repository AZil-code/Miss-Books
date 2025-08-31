export function BookPreview({ book }) {
   let readingLvl, bookAge, priceClass;

   if (book.pageCount > 500) readingLvl = 'Serious Reading';
   else if (book.pageCount > 200) readingLvl = 'Descent Reading';
   else readingLvl = 'Light Reading';

   if (new Date().getFullYear() - book.publishedDate > 10) bookAge = 'Vintage';
   else if (new Date().getFullYear() - book.publishedDate < 1) bookAge = 'New';

   if (book.listPrice.amount > 150) priceClass = 'expensive';
   else if (book.listPrice.amount < 100) priceClass = 'cheap';

   return (
      <article className="book-preview">
         {book.listPrice.isOnSale && <img className="on-sale" src="/assets/img/on-sale.jpg" />}
         <h2>{book.title}</h2>
         <h4>
            Price: <span className={priceClass}> {book.listPrice.amount} </span>
         </h4>
         <ul className="book-specs">
            <li className="reading-level">{readingLvl}</li>
            {bookAge && <li className="book-age">{bookAge}</li>}
         </ul>
      </article>
   );
}
