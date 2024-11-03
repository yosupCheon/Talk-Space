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
    const loginResult = await login({ username, password });
    //TODO: need to be tested after merged with backend
    console.log(loginResult);
    //TODO: navigate to correct place
    navigate('/');
  };
 
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await login();
//       setUsers(data);
//     };
//     fetchUsers();
//   }, []);

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
