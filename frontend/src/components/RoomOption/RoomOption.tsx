import React, { useState, useEffect, useRef} from 'react';
import {createRoom, joinRoom} from '../../api';
import {useUser} from '../UserContext';
import { useNavigate} from 'react-router-dom';
import './RoomOption.css';

const RoomOption: React.FC = () => {
    const {username} = useUser();
    const [showPopup, setShowPopup] = useState<'create' | 'join' | null>(null);
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate(); 

    const handleOpenPopup = (popupType: 'create' | 'join') => {
        setRoomName('');
        setShowPopup(popupType);
      };
    
    const handleSubmit = async () => {
        if (showPopup === 'create') {
            try {
                await createRoom ({hostName : username ?? "unknown", roomName});
                navigate(`/enter-room/${roomName}`);
            } catch (err) {
                alert('Failed: create a room');
            }
        } else {
            try {
                await joinRoom ({joinName : username ?? "unknown", roomName});
                navigate(`/enter-room/${roomName}`);
            } catch (err) {
                alert('Failed: join a room')
            }
        } 
    };
    
    // TODO: close the popup if outsdie is clicked
    const handleOutsideClick = (event: MouseEvent) => {};
    useEffect (() => {}, []);

    return (
        <div className="room-selection-page">
          <div className="room-box">
            <h1 className="room-title">Select a Room</h1>
            <button
              className="room-button create-room-button"
              onClick={() => handleOpenPopup('create')}
            >
              Create Room
            </button>
            <button
              className="room-button join-room-button"
              onClick={() => handleOpenPopup('join')}
            >
              Join Room
            </button>
            <button
              onClick={() => navigate('/login')}
              className="room-button logout-button"
            >
              Logout
            </button>
          </div> 
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-box">
                <h2>{showPopup === 'create' ? 'Create Room' : 'Join Room'}</h2>
                <input
                  type="text"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <div className="popup-buttons">
                  <button
                    className={showPopup==='create'?"popup-confirm-button":"popup-join-button"}
                      
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                  <button
                    className="popup-cancel-button"
                    onClick={() => setShowPopup(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
};


export default RoomOption; 