import { useCallback, useState, useMemo, use } from 'react';
import { chatlogHandlers } from "./chatlogHandlers";

const BASE_URL = 'https://four-derby-ai-chatbot-backend.onrender.com';

export function postHandlers(){
    const [connectionLoading,setConnectionLoading] = useState(false);
    const [messageLoading,setMessageLoading] = useState(false);
        
    const { chatlogs, addUserMessage, addDerbyMessage } = chatlogHandlers();

    const getConnection = useCallback(async () => {
        const data = { Data: "Client Connection : Successful" }; // Scoped inside function
        try{
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
        catch(error:any){
            setConnectionLoading(false);
            console.error(`Error : ${error.message}`)
        }
        finally{
            setConnectionLoading(false);
            console.log("Check Connection Complete")
        }
    },[]);

    const [chat, setChat] = useState("");

    const postMessage = useCallback(async (message: string) => {
        try {
            addUserMessage(message);

            // Compute the updated chat state *before* setting it
            const updatedChat = chat + "\nUser : " + message;
            setChat(updatedChat);  // Update state immediately
            
            // Prepare data for API request
            let data = { Message: message, Chat: updatedChat };
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
        catch (error: any) {
            console.error(error.message);
        } 
        finally {
            console.log("Message Processing Complete");
        }
    }, [chat, addDerbyMessage]);

    return { chatlogs, connectionLoading, messageLoading, getConnection, postMessage }
}