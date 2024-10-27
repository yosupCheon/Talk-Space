import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';

const CreateUser: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleCreateUser = async () => { 
    const creatUserResult = await createUser({username, password});
    //TODO: after backend connection
    //  redirect to login
    navigate('/login');
  };

  return (
    <div>
      <h1>Create User</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Username"
      /> 
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={handleCreateUser}>Sign Up</button>
    </div>
  );
};

export default CreateUser;
