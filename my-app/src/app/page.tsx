"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { messageHandlers } from "../app/utils/messageHandlers";
import { chatlogHandlers } from "../app/utils/chatlogHandlers";
import { postHandlers } from "./utils/postHandlers";

/**
 * Start Development Server:
 * npm run dev
 */

export default function Home() {
  const { message, handleChange, handleSubmit } = messageHandlers();
  const { printMessage, addUserMessage, addDerbyMessage } = chatlogHandlers();
  const { chats, checkConnection, postMessage } = postHandlers();

  checkConnection();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div id="chatContainer" className={styles.chatContainer}>
          {chats.map((chat, index) => (
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
      </footer>
    </div>
  );
}
