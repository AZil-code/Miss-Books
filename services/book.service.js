import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

/*
{
    "id": "OXeMG8wNskc",
    "title": "metus hendrerit",
    "subtitle": "mi est eros dapibus himenaeos",
    "authors": [ "Barbara Cartland" ],
    "publishedDate": 1999,
    "description": "placerat nisi sodales suscipit tellus",
    "pageCount": 713,
    "categories": [ "Computers", "Hack" ],
    "thumbnail": "http://ca.org/books-photos/20.jpg",
    "language": "en",
    "listPrice": { 
      "amount": 109,
      "currencyCode": "EUR",
      "isOnSale": false
  }
  */

const BOOK_KEY = 'bookDB';
_createBooks();

export const bookService = {
   query,
   get,
   remove,
   save,
   getDefaultFilter,
};

async function query(filterBy = {}) {
   // Need to add filtering
   let books = await storageService.query(BOOK_KEY);
   if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i');
      books = books.filter((book) => regExp.test(book.title) || regExp.test(book.description));
   }
   if (filterBy.maxPrice) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.maxPrice);
   }

   return books;
}

async function get(bookId) {
   return await storageService.get(BOOK_KEY, bookId);
}

async function remove(bookId) {
   return await storageService.remove(BOOK_KEY, bookId);
}

async function save(book) {
   if (book.id) return await storageService.put(BOOK_KEY, book);
   else return await storageService.post(BOOK_KEY, book);
}

function getDefaultFilter(filterBy = { txt: '' }) {
   return { txt: filterBy.txt, maxPrice: filterBy.maxPrice };
}

function _createBooks() {
   let books = utilService.loadFromStorage(BOOK_KEY);
   if (!books || !books.length) {
      const books = _generateBooks();
      utilService.saveToStorage(BOOK_KEY, books);
   }
}

function _generateBooks() {
   const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
   const books = [];
   for (let i = 0; i < 20; i++) {
      const book = {
         id: utilService.makeId(),
         title: utilService.makeLorem(2),
         subtitle: utilService.makeLorem(4),
         authors: [utilService.makeLorem(1)],
         publishedDate: utilService.getRandomIntInclusive(1950, 2024),
         description: utilService.makeLorem(20),
         pageCount: utilService.getRandomIntInclusive(20, 600),
         categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
         thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
         language: 'en',
         listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7,
         },
      };
      books.push(book);
   }
   console.log('books', books);
   return books;
}
