"use client";

import styles from "./page.module.css";
import { messageHandlers } from "../app/utils/messageHandlers";
import { chatlogHandlers } from "../app/utils/chatlogHandlers";
import { postHandlers } from "./utils/postHandlers";
import { useState, useEffect } from "react";

/**
 * Start Development Server:
 * npm run dev
 */

export default function Home() {
  const { message, handleChange, handleSubmit } = messageHandlers();
  const { printMessage, addUserMessage, addDerbyMessage } = chatlogHandlers();
  const { chatlogs, connectionLoading, messageLoading, getConnection, postMessage } = postHandlers();

    // Track if the component is mounted (client-side)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);  // This ensures the component runs only on the client
      getConnection();
    }, [getConnection]);

    // Prevents the JSX from being rendered on server-side. 
    // Only renders when useEffect is called and that is 
    // when all components are mounted on client side 
    // then useEffect is called and mounted becomes true and jsx is rendered
    // Prevent server-side rendering mismatch
    if (!mounted) return null;
 
  return (
    <div className={styles.page}>

      <div className={styles.loaderContainer}>
        {connectionLoading ? 
        <div className={styles.loader}>
        </div> 
        : null}
      </div>

      <main className={styles.main}>
        <div id="chatContainer" className={styles.chatContainer}>
          {chatlogs.map((chat, index) => (
            <div key={index} className={chat.className}>
              <p>
                {chat.content}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.messageContainer}>
          <form className={styles.messageForm} onSubmit={handleSubmit}>
            <input className={styles.messageInput} type="text" value={message} onChange={handleChange} placeholder="Message Derby"></input>
            <div className={styles.buttonContainer}>
              <button onClick={() => {postMessage(message);}} className={styles.submitMessage} type="submit">&gt;</button>
            </div>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerContent}>&copy; 2025 Adam</p>
        <p className={styles.footerContent}>Powered by Meta Ollama3</p>
      </footer>

    </div>
  );
}




/**
 * "use client";

// import { useEffect, useState } from "react";
// import styles from "./page.module.css";
// import { messageHandlers } from "../app/utils/messageHandlers";
// import { chatlogHandlers } from "../app/utils/chatlogHandlers";
// import { postHandlers } from "./utils/postHandlers";

// export default function Home() {
//   const { message, handleChange, handleSubmit } = messageHandlers();
//   const { addUserMessage, addDerbyMessage } = chatlogHandlers();
//   const { chatlogs, connectionLoading, messageLoading, getConnection, postMessage } = postHandlers();
  
//   // Track if the component is mounted (client-side)
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);  // This ensures the component runs only on the client
//     getConnection();
//   }, [getConnection]);

//   if (!mounted) return null;  // Prevent server-side rendering mismatch

//   return (
//     <div className={styles.page}>
//       <div className={styles.loaderContainer}>
//         {connectionLoading && (
//           <div className={styles.loader}></div>
//         )}
//       </div>

//       <main className={styles.main}>
//         <div id="chatContainer" className={styles.chatContainer}>
//           {chatlogs.map((chat, index) => (
//             <div key={index} className={chat.className}>
//               <p>{chat.content}</p>
//             </div>
//           ))}
//         </div>
//         <div className={styles.messageContainer}>
//           <form className={styles.messageForm} onSubmit={handleSubmit}>
//             <input
//               className={styles.messageInput}
//               type="text"
//               value={message}
//               onChange={handleChange}
//               placeholder="Message Derby"
//             />
//             <div className={styles.buttonContainer}>
//               <button
//                 onClick={() => { postMessage(message); }}
//                 className={styles.submitMessage}
//                 type="submit"
//               >
//                 &gt;
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <p className={styles.footerContent}>&copy; 2025 Adam</p>
//         <p className={styles.footerContent}>Powered by Meta Ollama3</p>
//       </footer>
//     </div>
//   );
// }
 */