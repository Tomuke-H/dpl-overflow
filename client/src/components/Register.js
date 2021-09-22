import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
    const {handleRegister} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({email, password})
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
            <Form.Input 
                value={passwordConfirmation}
                label="Confirm Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button>Login</Button>
        </Form>
    );
}

export default Register;