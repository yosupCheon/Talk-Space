import React, { useState, useEffect, useRef } from 'react';
import { createRoom, joinRoom } from '../../api/room';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './RoomOption.css';

const RoomOption: React.FC = () => {
  const { username } = useUser();
  const [showPopup, setShowPopup] = useState<'create' | 'join' | null>(null);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleOpenPopup = (popupType: 'create' | 'join') => {
    setRoomName('');
    setShowPopup(popupType);
  }; 

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (roomName === '') {
      alert('Failed: room name is empty...')
    } else if (showPopup === 'create') {
      try {
        const response = await createRoom({ hostName: username ?? "unknown", roomName });
        if (response.result === 'success') {
          navigate(`/enter-room/${roomName}`);
        } else {
          alert('Failed: create a room 00');
        }
      } catch (err) {
        alert('Failed: create a room 01');
      }
    } else {
      try {
        const response = await joinRoom({ joinName: username ?? "unknown", roomName });
        if (response.result === 'success') {
          navigate(`/enter-room/${roomName}`);
        } else {
          alert('Failed: join a room 00')  
        }
      } catch (err) {
        alert('Failed: join a room 01')
      }
    }
  };

  // TODO: close the popup if outsdie is clicked
  const handleOutsideClick = (event: MouseEvent) => { };
  useEffect(() => { }, []);

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
        <button
          className="room-button manage-button"
          onClick={() => navigate('/manage-account')}
        >
          Manage Account
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
              onKeyDown={handleEnter}
            />
            <div className="popup-buttons">
              <button
                className={showPopup === 'create' ? "popup-confirm-button" : "popup-join-button"}

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