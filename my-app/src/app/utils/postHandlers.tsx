import { useCallback, useState } from 'react';
import { useChatlogHandlers } from "./chatlogHandlers";

const BASE_URL = 'https://four-derby-ai-chatbot-backend.onrender.com';

export function usePostHandlers(){
    const [connectionIncomplete, setConnectionIncomplete] = useState(true);
    const [connectionLoading,setConnectionLoading] = useState(false);
    const [connectionComplete,setConnectionComplete] = useState(false); 
    const [chat, setChat] = useState("");
    const { chatlogs, addUserMessage, addDerbyMessage } = useChatlogHandlers();

    const getConnection = useCallback(async () => {
        const data = { Data: "Client Connection : Successful" }; // Scoped inside function
        try{
            setConnectionIncomplete(false);
            setConnectionLoading(true);
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
        catch(error:unknown){

            if (error instanceof Error) {
                console.error(`Error : ${error.message}`);
                setConnectionLoading(false);
                setConnectionComplete(false);
                setConnectionIncomplete(true);
            } else {
                console.error("An unknown error occurred", error);
                setConnectionLoading(false);
                setConnectionComplete(false);
                setConnectionIncomplete(true);
            }
        }
        finally{
            setConnectionIncomplete(false);
            setConnectionLoading(false);
            console.log("Check Connection Complete")
            setConnectionComplete(true);
        }
    },[]);

    const postMessage = useCallback(async (message: string) => {
        try {
            addUserMessage(message);

            // Compute the updated chat state *before* setting it
            const updatedChat = chat + "\nUser : " + message;
            setChat(updatedChat);  // Update state immediately
            
            // Prepare data for API request
            const data = { Message: message, Chat: updatedChat };
            console.log(`CHECKING CHAT: ${updatedChat}`);

            // Fetch request with the correct chat history
            const response = await fetch(BASE_URL + "/postMessage", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log("Post Message Success:", result);

            // Append AI's response to the chat history
            setChat(prevChat => prevChat + "\nAI : " + result.message);
            addDerbyMessage(result.message);
        } 
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred", error);
            }
        } 
        finally {
            console.log("Message Processing Complete");
        }
    }, [chat, addDerbyMessage]);

    return {
        connectionIncomplete, setConnectionIncomplete, 
        connectionLoading, setConnectionLoading,
        connectionComplete, setConnectionComplete,
        chat, setChat,
        chatlogs, addUserMessage, addDerbyMessage,
        getConnection, postMessage
    }
}