import React from 'react';

type MessageScreenProps = {
    messages: Map<string, boolean>;
};

const MessageScreen: React.FC<MessageScreenProps> = ({messages}) => {
    return (
        <div style={styles.screen}>
            {//messages.map((message,index)=>(
                Array.from(messages).map(([message, sender], index) => ( 
                <div key={index}
                    style={ sender ? styles.messageSendContainer :styles.messageReceiveContainer}>
                        <div style={sender ? styles.messageSent:styles.messageReceived}>
                        {message}
                    </div>
                 </div>      
            ))}
        </div>
      );
    };

const styles = {
    screen: {
        flex:1,
        padding:'1rem',
        overflowY:'auto' as const,
        border: '1px solid #ccc',
        marginBottom: '0.5rem',
        background: 'rgb(37, 34, 34)'
    },
    messageSendContainer: { 
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
    },
    messageReceiveContainer: { 
        display: "flex",
        justifyContent: "flex-start", 
        marginBottom: "10px",
    },
    messageSent: {
        display: "inline-block", 
        padding: "5px 10px", 
        background: 'linear-gradient(135deg, #2ea26e, #2a7f6b)',  
        color: "#fff",  
        borderRadius: "10px", 
        fontSize: "21px"
    },
    messageReceived: {
        display: "inline-block",
        padding: "5px 10px", 
        background: "linear-gradient(135deg, #1e4872, #2a7798)",  
        color: "#fff", 
        borderRadius: "10px", 
        fontSize: "21px"
    },
};

export default MessageScreen;