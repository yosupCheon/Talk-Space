import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";

interface UserContextType{
    username: string | null;
    token: string | null;
    setContextUsername: (username: string) => void;
    setContextToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined> (undefined);

export const UserProvider: React.FC<{ children: ReactNode}> =({children}) => {
   const [username, setContextUsername] = useState<string | null>(localStorage.getItem('username')||null);
   const [token, setContextToken] = useState<string | null>(localStorage.getItem('token')||null);

    useEffect (() => {
        if (username) {
            localStorage.setItem('username', username);
        }
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [username, token]);

   return (
    <UserContext.Provider value={{username, token, setContextUsername, setContextToken}}>
        {children}
    </UserContext.Provider> 
   );

};

// a custom hook for easy access to the context
export const useUser = (): UserContextType =>{
    const context = useContext(UserContext);
    if (!context){
        throw new Error ('useUser must be used within a UserProvider');
    }
    return context;
}
 