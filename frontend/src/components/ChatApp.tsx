import React, {useState} from 'react';
import MessageScreen from './MessageScreen';
import TextBar from './TextBar';

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    
    const handleSendMessage = (message:string) => {
        setMessages([...messages, message]);
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

