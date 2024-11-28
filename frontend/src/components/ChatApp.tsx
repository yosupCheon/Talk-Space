import React, {useState, useEffect, useRef} from 'react';
import MessageScreen from './MessageScreen';
import TextBar from './TextBar';
import {io, Socket} from 'socket.io-client';
import {useParams} from 'react-router-dom';

// // Define the type of events emitted by the server
interface ServerToClientEvents {
     message: (data: string) => void;
}  
// // Define the type of events sent from the client
interface ClientToServerEvents {
     myEvent: (data: { myData: string }) => void;
} 

const ChatApp: React.FC = () => {
    const { roomName } = useParams<{ roomName: string }>(); 
    const [messages, setMessages] = useState<string[]>([]); 
    const socket = useRef<Socket>();
    const [showLeft, setShowLeft] = useState<boolean>(false);
    const url = "http://localhost:8080";
    useEffect(() => {
        if (!socket.current) { 
            socket.current = io(url,{transports: ["websocket"],}); 
            console.log(`room name === ${roomName}`);
            socket.current.emit('join-room', roomName);

            // Listen for 'message' event from server and update state
            socket.current.on("receive-message", (msg) => {
                const realMsg = JSON.parse(JSON.stringify(msg));
                const msgMsg = realMsg['message'];
                const sender = realMsg['sender'];
                //console.log("Received message1:", socket.current?.id);  
                //console.log("Received message2:", sender);  
                if (socket.current?.id !== sender){
                    setShowLeft(false);
                    setMessages((prevMessages) => [...prevMessages, msgMsg]);
                } else {
                    setShowLeft(true);
                }
            });
        }
    }, []);

    const handleSendMessage = (message:string) => {
        setMessages([...messages, message]);
        socket.current?.emit("send-message", { roomName:roomName, message: message });
    }

    return (
        <div style={styles.container}>
            {/* <MessageScreen messages={messages}/> */}
            <MessageScreen messages={messages} showLeft={showLeft}/>
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

