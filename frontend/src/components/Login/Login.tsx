import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api'; 
import { useUser } from './../UserContext'; 
import './UserInput.css'

interface User { 
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const {setContextUsername} = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async () => { 
    if (username==='' || password==='') {
      alert('Do not leave an emtpy field');
    } else {
      const res = await login({username, password}); 
      if (res.result === "success"){
        setContextUsername(username);
       navigate('/room-option');
      } else if (res.result === "failed"){
        alert('Login failed. Please check your username and password.');
      }
    }
  }; 
  
  return (
    <div className="background">
      <div className="elevated-box">
        <h2>Login</h2> 
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          </div>

        <div className="form-group">
          <label htmlFor="username">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          </div>
          <div className="login-buttons"> 
            <button 
              type='button'
              onClick={handleLogin}
              className='login-button'>
                Login
              </button>
            <button
              type="button"
              className="create-account-button"
              onClick={()=> navigate('/create-user')}>
              Sign Up
            </button>
          </div>  
      </div>
      
    </div>
  );
};

export default Login; 