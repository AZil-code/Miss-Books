import { eventBusService } from '../../services/event-bus.service.js';

const { useState, useEffect } = React;

export function UserMsg() {
   const [msg, setMsg] = useState(null);

   useEffect(() => {
      eventBusService.on('show-user-msg', (msg) => {
         setMsg(msg);
         setTimeout(() => setMsg(null), 3000);
      });
   }, []);

   function onCloseBtn() {
      setMsg(null);
   }

   if (!msg) return null;
   return (
      <section className={`user-msg ${msg.type}`}>
         <h4>{msg.txt}</h4>
         <button onClick={onCloseBtn} className="close-btn">
            X
         </button>
      </section>
   );
}
