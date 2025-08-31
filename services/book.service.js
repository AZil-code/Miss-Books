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
      books = [
         {
            id: utilService.makeId(),
            title: 'metus hendrerit',
            description: 'placerat nisi sodales suscipit tellus',
            thumbnail: 'http://ca.org/books-photos/20.jpg',
            listPrice: {
               amount: 109,
               currencyCode: 'EUR',
               isOnSale: false,
            },
         },
         {
            id: utilService.makeId(),
            title: 'Harry POtter',
            description: 'Magic and Sorcerery',
            thumbnail: 'http://ca.org/books-photos/20.jpg',
            listPrice: {
               amount: 250,
               currencyCode: 'EUR',
               isOnSale: false,
            },
         },
         {
            id: utilService.makeId(),
            title: 'Lord of the Rings',
            description: 'My Precious',
            thumbnail: 'http://ca.org/books-photos/20.jpg',
            listPrice: {
               amount: 400,
               currencyCode: 'EUR',
               isOnSale: true,
            },
         },
      ];
      utilService.saveToStorage(BOOK_KEY, books);
   }
}
