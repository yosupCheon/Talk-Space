import React, { useState, useEffect, useRef} from 'react';
import {createRoom, joinRoom} from '../api';
import {useUser} from './UserContext';

const RoomOption: React.FC = () => {
    const {username} = useUser();
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [roomType, setRoomType] = useState<'create' | 'join' | null> (null);
    const [roomName, setRoomName] = useState('');
    const popupRef = useRef<HTMLDivElement>(null);

    const openCreateRoomPopup = () => {
        setRoomType('create');
        setPopupVisible(true);
    }

    const openJoinRoomPopup = () => {
        setRoomType('join');
        setPopupVisible(true);
    }

    const closePopup = () => {
        setRoomType(null);
        setPopupVisible(false);
    }

    const handleSubmit = async () => {
        if (roomName.trim()) {
            if (roomType === 'create') {
                if (roomType === 'create') {
                    await createRoom ({hostName : username ?? "unknown", roomName});
                  } else {
                    await joinRoom ({joinName : username ?? "unknown", roomName});
                  }
                closePopup();
            } else {
                alert('Please enter a valid room name...');
            }
        }
    };
    
    // TODO: close the popup if outsdie is clicked
    const handleOutsideClick = (event: MouseEvent) => {};
    useEffect (() => {}, []);

    return (
        <div>
            <h1> Room Options</h1>
            <button onClick={openCreateRoomPopup}>Create Room</button>
            <button onClick={openJoinRoomPopup}>Join Room</button>
            { popupVisible && (
                <div style = {styles.overlay}>
                    <div ref={popupRef} style={styles.popup}>
                        <h2>{roomType==='create'? 'Create Room':'Join Room'}</h2>
                        <input
                            type="text"
                            placeholder='Enter Room Name'
                            value={roomName}
                            onChange={(e)=> setRoomName(e.target.value)}
                            style={styles.input}
                        />
                        <div style={styles.button}>
                            <button onClick={closePopup} style={styles.button}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} style={styles.button}>
                                {roomType==='create'? 'Create':'Join'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Makes sure the overlay is on top
  },
  popup: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
};


export default RoomOption; 