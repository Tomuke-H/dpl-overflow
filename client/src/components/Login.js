import React, { useContext, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider'

const Login = (props) => {
    const {handleLogin} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({email, password})
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input 
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input 
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Login</Button>
        </Form>
    );
};

export default Login;