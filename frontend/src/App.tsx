import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
