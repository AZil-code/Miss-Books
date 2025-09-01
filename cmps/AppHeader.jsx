const { useNavigate, Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
   return (
      <header className="app-header full main-layout">
         <section className="header-container">
            <h1>React Starter Proj</h1>
            <nav className="app-nav">
               <NavLink to="/book">Books</NavLink>
            </nav>
         </section>
      </header>
   );
}
