import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    const handleRegister = (user) => {};

    const handleLogin = (users) => {};

    const handleLogout = () =>{};
    
    return (
        <AuthContext.Provider value={{user, handleRegister, handleLogin, handleLogout}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;