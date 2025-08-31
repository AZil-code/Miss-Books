import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './cmps/HomePage.jsx';

export function RootCmp() {
   return (
      <section className="app main-layout">
         <AppHeader />
         <main class="main-layout">
            <Routes>
               <Route path="/" element={<Navigate to="/home" />} />
               <Route path="/home" element={<HomePage />} />
               <Route path="/about" element={<AboutUs />} />
               <Route path="/book" element={<BookIndex />} />
               <Route path="/book/:bookId" element={<BookDetails />} />
               <Route path="/book/edit" element={<BookEdit />} />
            </Routes>
            <Home />
         </main>
      </section>
   );
}
