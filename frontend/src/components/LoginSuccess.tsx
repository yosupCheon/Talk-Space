import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginFailed: React.FC = () => {
    
    const navigate = useNavigate();

    return (
        <div>
            <h1>Login Success!</h1>
            <button onClick={() => navigate('/login')}>Go back...</button>
        </div>
    );
};

export default LoginFailed;