import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api';
import './UserInput.css'

const CreateUser: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleCreateUser = async () => { 
    if (password !== rePassword) {
      alert('Failed: Password not matching...');
      setPassword('');
      setConfirmPassword('');
    } else {
      const creatUserResult = await createUser({username, password});
      navigate('/login');
    }
  };

  return (
    <div className="background">
      <div className="elevated-box">
        <h2>Create Account</h2> 
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="password"
              type="password"
              value={rePassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>
          <button type='button'
            className="signup-button"
            onClick={handleCreateUser}
            >Sign Up</button>
      </div>
    </div>
  );
};

export default CreateUser;
