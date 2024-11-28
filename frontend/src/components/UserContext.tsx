import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";

interface UserContextType{
    username: string | null;
    setContextUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined> (undefined);

export const UserProvider: React.FC<{ children: ReactNode}> =({children}) => {
   const [username, setContextUsername] = useState<string | null>(localStorage.getItem('username')||null);

    useEffect (() => {
        if (username) {
            localStorage.setItem('username', username);
        }
    }, [username]);

   return (
    <UserContext.Provider value={{username, setContextUsername}}>
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
