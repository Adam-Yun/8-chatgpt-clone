"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
/**
 * Start Development Server:
 * npm run dev
 * 
 * Color Palette:
 * Darkest to Lightest
 * 
 * 0D1B2A
 * 1B263B
 * 415A77
 * 778DA9
 * E0E1DD
 * 
 * 0A162C
 * 282D40
 * 4A495A
 * 83828B
 * BCBCBC
 */

export default function Home() {
  // Initialize the event type for event handlers.
  type e = React.ChangeEvent<HTMLInputElement>;
  type f = React.FormEvent<HTMLFormElement>;

  const [message, setMessage] = useState("");
  
  const handleChange = (event:e) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event:f) => {
    event.preventDefault();
    console.log(message);
    setMessage("");
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.messageContainer}>
          <form className={styles.messageForm} onSubmit={handleSubmit}>
            <input className={styles.messageInput} type="text" value={message} onChange={handleChange} placeholder="Message Derby"></input>
            <div className={styles.buttonContainer}>
              <button className={styles.submitMessage} type="submit">&gt;</button>
            </div>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
