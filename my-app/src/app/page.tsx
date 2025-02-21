"use client";

import styles from "./page.module.css";
import { useMessageHandlers } from "../app/utils/messageHandlers";
import { usePostHandlers } from "./utils/postHandlers";
import { useState, useEffect } from "react";

/**
 * Start Development Server:
 * npm run dev
 */

export default function Home() {
  const { message, handleChange, handleSubmit } = useMessageHandlers();
  const {
    connectionIncomplete, 
    connectionLoading,
    connectionComplete,
    chatlogs,
    getConnection, postMessage,
  } = usePostHandlers();

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
        {connectionIncomplete ? 
        <div className={styles.notConnected}>
        </div> 
        : null}
        {connectionLoading ? 
        <div className={styles.loader}>
        </div> 
        : null}
        {connectionComplete ? 
        <div className={styles.connected}>
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