import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; 

interface User { 
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await login({username, password});
    console.log(res);
    if (res.result === "success"){
      navigate('/test-chat');
    } else if (res.result === "failed"){
      alert('Login failed. Please check your username and password.');
    };
  }; 
  
  return (
    <div>
      <h1>Login</h1>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/create-user')}>Sign Up</button>
    </div>
  );
};

export default Login; 