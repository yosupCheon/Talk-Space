import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitRoom } from '../../api/room';

interface RoomProps {
    userName: string | null;
    roomName: string | undefined;
}

const TopBar: React.FC<RoomProps> = ({userName, roomName}) => {
    const navigate = useNavigate();
    const username = userName as string;
    const roomname = roomName as string;

    const handleExit = async () => {
        const response = await exitRoom({username, roomname})
        navigate('/room-option');
    }; 
     
    return (
        <div style={styles.container}>
            <button style={styles.button}
            onClick={handleExit}
            >
                Exit
            </button>
            <div style={styles.name}>
                {roomName}
            </div>
        </div>
    )

}

const styles = {
    container: {
      display: 'flex',
      padding: '0.5rem',
      borderTop: '1px solid #ccc',
      background: '#307686',
    }, 
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#B22222',
      color: '#fff',
      cursor: 'pointer',
    },
    name: {
        color: 'white',
        margin: 'auto', 
        width: '50%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    }
  };


export default TopBar;