import { useState } from "react";

// Initialize the event type for event handlers.
type e = React.ChangeEvent<HTMLInputElement>;
type f = React.FormEvent<HTMLFormElement>;
  
export function messageHandlers(){

    const [message, setMessage] = useState("");

    const handleChange = (event:e) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event:f) => {
        event.preventDefault();
        setMessage("");
    }

    return { message, handleChange, handleSubmit };
}