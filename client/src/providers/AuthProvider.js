import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const wait = (ms) => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res("yo");
          }, ms);
        });
      };

    const handleRegister = async (user, history) => {
        try {
            setError(null)
            setLoading(true)
            let res = await axios.post('/api/auth', user)
            setUser(res.data.data)
            history.push('/')
        }catch(err){
            setError(err.response.data.errors ? err.response.data.errors : err.response.data)
            console.log(err)
        }finally{
            setLoading(false)
        }
    };

    const handleUserUpdate = async (user, history) => {
        try {
            setError(null)
            setLoading(true)
            let res = await axios.put('/api/auth', user)
            setUser(res.data.data)
            history.push('/')
        }catch(err){
            setError(err.response.data.errors ? err.response.data.errors : err.response.data)
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin = async (user, history) => {
        try{
            let res = await axios.post('/api/auth/sign_in', user)
            setUser(res.data.data)
            history.push('/user')
        }catch (err) {
            setError(err)
            console.log(err)
        }
    };

    const handleLogout = (history) =>{
        setUser(null)
        localStorage.removeItem('access-token')
        history.push('/login')
    };
    
    return (
        <AuthContext.Provider value={{
            user, 
            error, 
            setError, 
            setUser, 
            handleRegister, 
            handleLogin, 
            handleLogout, 
            handleUserUpdate,
            loading,
            authenticated: user ? true : false
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;