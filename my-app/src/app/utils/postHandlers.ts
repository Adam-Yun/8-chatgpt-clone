import { useCallback, useEffect, useState } from 'react';

const BASE_URL = 'https://four-derby-ai-chatbot-backend.onrender.com';
let chat: string = ""

export function postHandlers(){
    const data = { Data: "Client Connection : Successful" };

    const checkConnection = useCallback(async () => {
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
            console.log("Success:", result);
        }
        catch(error:any){
            console.error(`Error : ${error.message}`)
        }
        finally{
            console.log("Check Connection Complete")
        }
    },[data]);

    // useEffect will now run once when the component mounts
    useEffect(() => {
        checkConnection();
    }, [checkConnection]); // Empty dependency array ensures the effect runs only once

    const postMessage = async (message: string) => {
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

        }
    }

    return { checkConnection }
}

    // const checkConnection = async () => {
    //     try{
    //         const response = await fetch( BASE_URL + '/getNetworkConnection' ,{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });
    //         // Check if the response is OK (status 200-299)
    //         if (!response.ok) {
    //             throw new Error(`Server error: ${response.status}`);
    //         }
    //         // Parse the JSON response
    //         const result = await response.json();
    //         // Handle the successful response
    //         console.log("Success:", result);
    //     }
    //     catch(error:any){
    //         console.error(`Error : ${error.message}`)
    //     }
    //     finally{
    //         console.log("Check Connection Complete")
    //     }
    // } 