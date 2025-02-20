import styles from "../page.module.css";
import { useState } from "react";

export function chatlogHandlers(){

    const [chatlogs, setChatlogs] = useState<{className:string; content: string}[]>([]);

    const addUserMessage = (message: string) => {
        setChatlogs((chatlogs) => [
            ...chatlogs,
            {className: styles.userMessage , content: message},
        ]);
    };

    const addDerbyMessage = (message: string) => {
        setChatlogs((chatlogs) => [
            ...chatlogs,
            {className: styles.derbyMessage, content: message},
        ]);
    };

    return { chatlogs, addUserMessage, addDerbyMessage };
}