import React, {useState, useEffect, useRef} from 'react';
import MessageScreen from './MessageScreen';
import TextBar from './TextBar';
import {io, Socket} from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useUser } from './../UserContext'; 
import TopBar from './TopBar';

//Define the type of events emitted by the server
interface ServerToClientEvents {
     message: (data: string) => void;
}  
//Define the type of events sent from the client
interface ClientToServerEvents {
     myEvent: (data: { myData: string }) => void;
} 

const ChatApp: React.FC = () => {
    const { username } = useUser();
    const { roomName } = useParams<{ roomName: string }>();  
    const socket = useRef<Socket>();
    const [messages, setMessages] = useState<Map<string, boolean>>(new Map());
    const url = "http://localhost:8080";
    useEffect(() => {
        if (!socket.current) { 
            socket.current = io(url,{transports: ["websocket"],}); 
            console.log(`room name === ${roomName}`);
            socket.current.emit('join-room', roomName);
            
            socket.current.on("receive-message", (msg) => {
                const realMsg = JSON.parse(JSON.stringify(msg));
                const msgMsg = realMsg['message'];
                const sender = realMsg['sender'];
                console.log("Received message1:", socket.current?.id);  
                console.log("Received message2:", sender);  
                if (socket.current?.id !== sender){ 
                    setMessages((prevMessages) => {
                        const newMessages = new Map(prevMessages);
                        newMessages.set(msgMsg, false);
                        return newMessages;
                      });
                    
                } 
            });
        }
    }, []);

    const handleSendMessage = (message:string) => {
        //setMessages([...messages, message]);
        //setMessages((prevMessages) => [...prevMessages, message]);
        setMessages((prevMessages) => {
            const newMessages = new Map(prevMessages);
            newMessages.set(message, true); 
            return newMessages;
          });
        socket.current?.emit("send-message", { roomName:roomName, message: message });
    }

    return (
        <div style={styles.container}>
            <TopBar roomName={roomName} userName={username}/>
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
        background: 'rgb(106, 90, 90)'
    },
};

export default ChatApp;

