import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
    const {handleRegister, error, loading} = useContext(AuthContext);
    const [email, setEmail] = useState('test@test.com')
    const [name, setName] = useState('Tester')
    const [password, setPassword] = useState('123456')
    const [passwordConfirmation, setPasswordConfirmation] = useState('123456')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({email, password, name}, history)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <Form.Control
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    />
                <Form.Control 
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <Form.Control 
                    value={passwordConfirmation}
                    label="Confirm Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <Button loading={loading} disabled={loading}>Register</Button>
            </Form>
        </div>
    );
}

export default Register;