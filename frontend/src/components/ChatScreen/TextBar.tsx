import React, {useState} from 'react';

type TextBarProps = {
    onSendMessage:(message:string) => void;
};

const TextBar: React.FC<TextBarProps> = ({onSendMessage}) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };
    const handleEnterPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    return (
      <div style={styles.container}>
        <input
            type="text"
            value={text}
            onChange={(e)=> setText(e.target.value)}
            onKeyDown={handleEnterPress}
            style={styles.input}
            placeholder="Type your message..."
        />
        <button onClick={handleSend} style={styles.button}>
            Send
        </button>
      </div>  
    );
};

const styles = {
    container: {
      display: 'flex',
      padding: '0.5rem',
      borderTop: '1px solid #ccc',
      background: 'rgb(147, 137, 137)'
    },
    input: {
      flex: 1,
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginRight: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#4169E1',
      color: '#fff',
      cursor: 'pointer',
    },
  };

export default TextBar;