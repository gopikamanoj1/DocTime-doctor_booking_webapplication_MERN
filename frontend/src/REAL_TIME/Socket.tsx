import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";


export const useSocket = (): Socket<any>| null => {
    const [socket, setSocket] = useState<Socket<any> | null>(null);

    useEffect(() => {
        const newSocket = io("https://doctime-doctor-booking-webapplication-42qm.onrender.com", {
            reconnect: true,
            secure: true,
            transports: ['polling', 'websocket'], 
        }); 
        setSocket(newSocket);
        return () => {  
            newSocket.disconnect();
        };
   
    }, []);

    
    return socket;
};