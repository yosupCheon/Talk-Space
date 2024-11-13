import React from 'react';

type MessageScreenProps = {
    messages: string[];
};

const MessageScreen: React.FC<MessageScreenProps> = ({messages}) => {

    return (
        <div style={styles.screen}>
            {messages.map((message,index)=>(
                <div key={index} style={styles.message}>
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
        marginBottom: "0.5rem"
    },
    message: {
        padding: "0.5 rem",
        backgroundColor: "#f0f0f0",
        boarderRadius:'4px', 
        marginButton:'0.5rem',
    },
};

export default MessageScreen;