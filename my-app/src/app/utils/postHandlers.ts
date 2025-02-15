import { useCallback, useEffect, useMemo } from 'react';
import { chatlogHandlers } from "../utils/chatlogHandlers"

const BASE_URL = 'https://four-derby-ai-chatbot-backend.onrender.com';
let chat: string = ""

export function postHandlers(){
    const { chats, printMessage, addUserMessage, addDerbyMessage } = chatlogHandlers();
    // // const data = { Data: "Client Connection : Successful" };
    // const data = useMemo(() => ({Data: "Client Connection : Successful" }),[]);

    const getConnection = useCallback(async () => {
        const data = { Data: "Client Connection : Successful" }; // Scoped inside function

        try{
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

        console.log(`chat : ${chat}`)
        addUserMessage(message)
        const data = {Message: message, Chat:chat }
        chat += `\nUser : ${message}`;
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
        }
        catch(error:any){
            console.error(error.message);
        }
        finally{
            console.log("Message Processing Complete")
        }
    },[]);

    const postOneMessage = async (message: string) => {
        const data = {Message: message, Chat:chat }
        chat += `\nUser : ${message}`;
        try{
            const response = await fetch ( BASE_URL + "/postMessage" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
        catch(error:any){
            console.error(error.message);
        }
        finally{
            console.log("Message Processing Complete")
        }
    }

    return { checkConnection, postMessage }
}