import React, {useState, useEffect, useRef} from 'react';
import MessageScreen from './MessageScreen';
import TextBar from './TextBar';
import {io, Socket} from 'socket.io-client';

// // Define the type of events emitted by the server
interface ServerToClientEvents {
     message: (data: string) => void;
}  
// // Define the type of events sent from the client
interface ClientToServerEvents {
     myEvent: (data: { myData: string }) => void;
} 


const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]); 
    const socket = useRef<Socket>();

    useEffect(() => {
        if (!socket.current) {
            //socket.current = io("http://localhost:8080"); 
            socket.current = io("url",{
                    transports: ["websocket"],  // explicit WebSocket
                  });
            socket.current.on("connect", () => {
                console.log("Connected to server 1:", socket.current?.id);
            });

            // Listen for 'message' event from server and update state
            socket.current.on("message", (data: { text: string }) => {
                console.log("Received message:", data.text);
                setMessages((prevMessages) => [...prevMessages, data.text]);
            });
        }
    }, []);

    const handleSendMessage = (message:string) => {
        setMessages([...messages, message]);
        socket.current?.emit("message", { text: message });
    }

    return (
        <div style={styles.container}>
            <MessageScreen messages={messages}/>
            <TextBar onSendMessage={handleSendMessage}/>
        </div>
    );
};

const styles = {
    container:{
        display:"flex",
        flexDirection:"column" as const, 
        height: "100vh",
        width:"100%",
    },
};

export default ChatApp;

