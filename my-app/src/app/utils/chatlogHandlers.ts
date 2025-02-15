import { useState } from "react";

export function chatlogHandlers(){

    const [chats, setChats] = useState<{className:string; content: string}[]>([]);

    const addUserMessage = (message: string) => {
        setChats((chats) => [
            ...chats,
            {className: "userMessage", content: message},
        ]);
        console.log(`addUserMessage Called -> Message : ${message}`);
        console.log(`addUserMessage Called -> Chats : ${JSON.stringify(chats)}`);
    };

    const addDerbyMessage = (message: string) => {
        setChats((chats) => [
            ...chats,
            {className: "derbyMessage", content: message},
        ]);
        console.log(`addDerbyMessage Called -> Message : ${message}`);
        console.log(`addDerbyMessage Called -> Chats : ${JSON.stringify(chats)}`);
    };

    const printMessage = (message: string) => {
        console.log(message);
    };

    return { chats, printMessage, addUserMessage, addDerbyMessage };
}