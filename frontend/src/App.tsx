import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser'; 
import LoginFailed from './components/LoginFailed';
import LoginSuccess from './components/LoginSuccess';
import ChatApp from './components/ChatApp';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} /> 
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/login-fail" element={<LoginFailed />} /> 

          <Route path="/test-chat" element={<ChatApp/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
