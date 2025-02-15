import { useCallback, useEffect, useState, useMemo } from 'react';
import { chatlogHandlers } from "../utils/chatlogHandlers";

const BASE_URL = 'https://four-derby-ai-chatbot-backend.onrender.com';
let chat: string = ""

export function postHandlers(){
    const { chats, addUserMessage, addDerbyMessage } = chatlogHandlers();

    const getConnection = useCallback(async () => {
        const data = { Data: "Client Connection : Successful" }; // Scoped inside function
        const [loading, setLoading] = useState(false);
        try{
            setLoading(true);
            const response = await fetch( BASE_URL + '/getNetworkConnection' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            // Parse the JSON response
            const result = await response.json();

            // Handle the successful response
            console.log("Check Connection Success:", result);
        }
        catch(error:any){
            console.error(`Error : ${error.message}`)
        }
        finally{
            setLoading(false);
            console.log("Check Connection Complete")
        }
    },[]);

    const checkConnection = async () => {
        // useEffect will now run once when the component mounts
        useEffect(() => {
            getConnection();
        }, [getConnection]); // Empty dependency array ensures the effect runs only once
    }

    let chat: string = useMemo(() => (""),[]);
    
    const postMessage = useCallback(async (message: string) => {
        // Render user's message into the chat
        addUserMessage(message);
        // Store user's messages to use as context and history for Ollama3 to reply with context and accuracy.
        chat += `\nUser : ${message}`;
        // Format the message and chat context/history as an object to send as a post method
        const data = { Message: message, Chat:chat }
        try{
            const response = await fetch ( BASE_URL + "/postMessage" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            // Parse the JSON response
            const result = await response.json();
            // Handle the successful response
            console.log("Post Message Success:", result);
            // Render the Ollama3 response into the chat
            addDerbyMessage(result.message);
        }
        catch(error:any){
            console.error(error.message);
        }
        finally{
            console.log("Message Processing Complete")
        }
    },[addDerbyMessage]);

    return { chats, checkConnection, postMessage }
}