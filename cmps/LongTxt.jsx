const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
   const [isExpanded, setIsExpanded] = useState(false);

   function onClick() {
      setIsExpanded((prev) => !prev);
   }

   const txtToDisplay = isExpanded || txt.length <= length ? txt : `${txt.slice(0, length - 1)}...`;

   return (
      <section className="long-txt">
         <p>{txtToDisplay} </p>
         {txt.length > length && (
            <a className="expand-txt" onClick={onClick}>
               {isExpanded ? 'Read Less' : 'Read More'}
            </a>
         )}
      </section>
   );
}
