import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider';
import ErrorMessage from './ErrorMessage';

const EditUser = () => {
    const {handleUserUpdate, error, loading, user} = useContext(AuthContext);
    const [name, setName] = useState(user.name)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUserUpdate({password, name}, history)
    }

    return (
        <div>
            {error && <ErrorMessage header="Could not Update" error={error}/>}
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    />
                <Form.Input 
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <Form.Input 
                    value={passwordConfirmation}
                    label="Confirm New Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <Button loading={loading} disabled={loading}>Update</Button>
            </Form>
        </div>
    );
}

export default EditUser;