const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
   const [displayedText, setText] = useState(`${txt.slice(0, length - 1)}...`);

   function onClick() {
      setText((prevTxt) => (prevTxt.length > length + 3 ? `${txt.slice(0, length - 1)}...` : txt));
   }

   const buttonLabel = displayedText.length > length + 3 ? 'Read Less' : 'Read More';

   return (
      <section className="long-txt">
         <p>
            {displayedText}{' '}
            <a className="expand-txt" onClick={onClick}>
               {buttonLabel}
            </a>
         </p>
         {txt.length > length && (
            <button className="expand-button" onClick={onClick}>
               {buttonLabel}
            </button>
         )}
      </section>
   );
}
