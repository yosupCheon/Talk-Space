import React, { useState } from 'react';
import './PasswordModal.css';
import { useUser } from '../UserContext';
import { updateUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newPassword: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSave }) => {
    const { username } = useUser();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async () => {
        if (newPassword === confirmPassword) {
            const res = await updateUser({ 
                username: username ?? "unknown",newPassword: newPassword});
                if (res.result === "success"){
                    alert('Successfully updated! Please login again');
                    navigate('/login');
                } else if (res.result === "failed"){
                    alert('Delete failed. Please try again later.');
                }
        } else {
            alert('Passwords do not match');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PasswordModal;