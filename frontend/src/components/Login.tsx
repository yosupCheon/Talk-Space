import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import io from 'socket.io-client';

interface User { 
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginResult = await login({ username, password });
    //TODO: need to be tested after merged with backend
    console.log("test"); 
    if (loginResult.error) {
      navigate('/login-fail');
    } else {
      navigate('/login-success');
    }
    navigate('/login-success');
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

//TODO: Review
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await login();
//       setUsers(data);
//     };
//     fetchUsers();
//   }, []);

//TODO: Socket Test Review
// const test = () => {
//   const socket = io('http://localhost:5000'); // Connect to the Socket.io server
//   socket.on('connect', () => {
//     console.log('Connected to Socket.io server');
//   });
//   socket.on('receiveMessage', (message) => {
//     console.log('Message from server:', message);
//   });
//   // Emit a test message to the server
//   socket.emit('sendMessage', 'Hello from the client!');
// }