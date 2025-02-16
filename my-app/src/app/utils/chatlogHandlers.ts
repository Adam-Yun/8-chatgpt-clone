import { useState } from "react";

export function chatlogHandlers(){

    const [chats, setChats] = useState<{className:string; content: string}[]>([]);

    const addUserMessage = (message: string) => {
        setChats((chats) => [
            ...chats,
            {className: "userMessage", content: message},
        ]);
    };

    const addDerbyMessage = (message: string) => {
        setChats((chats) => [
            ...chats,
            {className: "derbyMessage", content: message},
        ]);
    };

    const printMessage = (message: string) => {
        console.log(message);
    };

    return { chats, printMessage, addUserMessage, addDerbyMessage };
}