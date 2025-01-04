import React, {useState} from 'react';
import { deleteUser } from '../../api/user'; 
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './ManageAccount.css'
import PasswordModal from './PasswordModal';

const ManageAccount: React.FC = () => {
    const { username } = useUser();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editPassword = () => {
        setIsModalOpen(true);
    };
    const handleSavePassword = (newPassword: string) => {
        console.log('New Password:', newPassword);
    };

    const deleteAccount = async () => { 
        if (window.confirm("Are you sure you want to delete your account?")) {
            const res = await deleteUser({username:username ?? "unknown"}); 
            if (res.result === "success"){
                navigate('/login');
            } else if (res.result === "failed"){
                alert('Delete failed. Please try again later.');
            }
        }
    }

    return (
        <div className="background">
          <div className="elevated-box">
            <h2>Manage Account</h2>  
            <div className="button-container">
                    <button className="big-button"
                        onClick={editPassword}> 
                        Edit Password
                    </button>
                    <button className="big-button"
                        onClick={deleteAccount}> 
                        Delete Account
                    </button>
                    
                </div>
          </div>
          <PasswordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePassword}
            />
        </div>
        
      );
}

export default ManageAccount;