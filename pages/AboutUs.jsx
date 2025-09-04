import { utilService } from '../services/util.service.js';
const { Link, Outlet } = ReactRouterDOM;

export function AboutUs() {
   return (
      <section className="about">
         <h1>About Miss Books</h1>
         <p>{utilService.makeLorem()}</p>
         <nav>
            <Link to="/about/team">Team</Link>
            <Link to="/about/vision">Vision</Link>
         </nav>
         <section>
            <Outlet />
         </section>
      </section>
   );
}
