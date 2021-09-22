import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    const handleRegister = async (user, history) => {
        try {
            let res = await axios.post('/api/auth', user)
            setUser(res.data.data)
            history.push('/')
        }catch(err){
            alert('register is broke! check console')
            console.log(err)
        }
    };

    const handleLogin = async (user, history) => {
        try{
            let res = await axios.post('/api/auth/sign_in', user)
            setUser(res.data.data)
            history.push('/things')
        }catch (err) {
            alert('cannot login! is broke!')
            console.log(err)
        }
    };

    const handleLogout = (history) =>{
        setUser(null)
        localStorage.removeItem('access-token')
        history.push('/login')
    };
    
    return (
        <AuthContext.Provider value={{user, handleRegister, handleLogin, handleLogout, authenticated: user ? true : false}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;