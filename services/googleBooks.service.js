export const googleBookService = {
   fetchGoogleBooks,
   formatGoogleBook,
};

async function fetchGoogleBooks(searchStr) {
   const googleBookEndpoint = `https://www.googleapis.com/books/v1/volumes?printType=books`;
   try {
      const res = await fetch(`${googleBookEndpoint}&q=${encodeURIComponent(searchStr)}`, { method: 'GET' });
      if (!res.ok) throw new Error(`Bad status code! ${res.status} - ${res.statusText}`);
      return (await res.json()).items;
   } catch (error) {
      console.error('Failed fetching google books: ', error);
   }
}

// // For Development
// async function fetchGoogleBooks(searchStr) {
//    return mockRes.items;
// }

function formatGoogleBook(googleBook) {
   const { volumeInfo } = googleBook;
   const { title, subtitle, authors, description, pageCount, categories, language, publishedDate, imageLinks } =
      volumeInfo;
   return {
      title,
      subtitle,
      authors,
      publishedDate: publishedDate ? +publishedDate.split('-')[0] : '',
      description,
      pageCount,
      categories,
      thumbnail: imageLinks ? imageLinks.thumbnail : '',
      language,
      extId: googleBook.id,
   };
}
