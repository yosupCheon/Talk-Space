import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import ChatApp from './components/ChatApp'; 
import RoomOption from './components/RoomOption';
import { UserProvider } from './components/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider> 
    <Router>
      <div className="App">
        <Routes> 
          
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room-option" element={<RoomOption />} />
            <Route path="/chat-page" element={<ChatApp/>} />          

        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;
