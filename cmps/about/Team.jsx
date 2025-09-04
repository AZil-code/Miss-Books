const sampTeamMembers = ['Cleveland Quagmire', 'Peter Griffin', 'Joe'];

export function Team() {
   return (
      <section>
         <h2>Our Team</h2>
         <ul className="team-list">
            {sampTeamMembers.map((member) => (
               <li key={member}>{member}</li>
            ))}
         </ul>
      </section>
   );
}
