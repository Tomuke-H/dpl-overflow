import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider'

const Login = (props) => {
    const {handleLogin} = useContext(AuthContext);
    const [email, setEmail] = useState('test@test.com')
    const [password, setPassword] = useState('123456')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({email, password}, history)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Login</Button>
        </Form>
    );
};

export default Login;