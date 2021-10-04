import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import { Button, Form } from 'react-bootstrap'

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
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    />
                <Form.Control
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <Form.Control
                    value={passwordConfirmation}
                    label="Confirm New Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <Button>Update</Button>
            </Form>
        </div>
    );
}

export default EditUser;