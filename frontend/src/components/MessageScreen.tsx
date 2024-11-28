import React from 'react';

type MessageScreenProps = {
    messages: string[];
    showLeft: boolean;
};

const MessageScreen: React.FC<MessageScreenProps> = ({messages, showLeft}) => {
    return (
        <div style={styles.screen}>
            {messages.map((message,index)=>(
                // TODO: show left and right when send and receive correctly
                <div key={index} style={true?styles.messageSend:styles.messageReceived}>
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