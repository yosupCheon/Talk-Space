import React from 'react';

type MessageScreenProps = {
    messages: Map<string, boolean>;
};

const MessageScreen: React.FC<MessageScreenProps> = ({messages}) => {
    return (
        <div style={styles.screen}>
            {//messages.map((message,index)=>(
                Array.from(messages).map(([message, sender], index) => ( 
                <div key={index} style={sender?styles.messageSend:styles.messageReceived}>
                    {message}
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
        marginBottom: '0.5rem'
    },
    messageSend: {
        padding: "0.5rem",
        boarderRadius:'4px', 
        marginButton:'0.5rem',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    messageReceived: {
        padding: "0.5rem",
        boarderRadius:'4px', 
        marginButton:'0.5rem',
        display: 'flex',
        justifyContent: 'flex-start'
    },
};

export default MessageScreen;