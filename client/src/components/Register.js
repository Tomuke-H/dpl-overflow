import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider';
import ErrorMessage from './ErrorMessage';

const Register = () => {
    const {handleRegister, error, loading} = useContext(AuthContext);
    const [email, setEmail] = useState('test@test.com')
    const [password, setPassword] = useState('123456')
    const [passwordConfirmation, setPasswordConfirmation] = useState('123456')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({email, password}, history)
    }

    return (
        <div>
            {error && <ErrorMessage header="Could not Register" error={error}/>}
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
                <Button loading={loading} disabled={loading}>Register</Button>
            </Form>
        </div>
    );
}

export default Register;