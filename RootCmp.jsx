import { AppHeader } from './cmps/AppHeader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { BookIndex } from './pages/BookIndex.jsx';
import { BookDetails } from './pages/BookDetails.jsx';
import { BookEdit } from './pages/BookEdit.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { Team } from './cmps/about/Team.jsx';
import { Vision } from './cmps/about/Vision.jsx';
import { UserMsg } from './cmps/shared/UserMsg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
   return (
      <Router>
         <section className="app main-layout">
            <AppHeader />
            <main className="main-layout">
               <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutUs />}>
                     <Route path="/about/team" element={<Team />} />
                     <Route path="/about/vision" element={<Vision />} />
                  </Route>
                  <Route path="/book" element={<BookIndex />}>
                     <Route path="/book/edit" element={<BookEdit />} />
                     <Route path="/book/edit/:bookId" element={<BookEdit />} />
                  </Route>
                  <Route path="/book/:bookId" element={<BookDetails />} />
                  {/* <Route path="/book/edit" element={<BookEdit />} /> */}
               </Routes>
            </main>
            <UserMsg />
         </section>
      </Router>
   );
}
