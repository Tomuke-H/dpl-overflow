import React, { useContext, useState } from 'react'
import { Form, Button, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import DPLGreyButton from './DPLGreyButton';
import DPLLightWeightButton from './DPLLightWeightButton';

const Register = () => {
    const {handleRegister} = useContext(AuthContext);
    const [email, setEmail] = useState('test1@test.com')
    const [name, setName] = useState('Tester1')
    const [password, setPassword] = useState('123456')
    const [passwordConfirmation, setPasswordConfirmation] = useState('123456')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
          }
        handleRegister({email, password, name}, history)
    };

    return (
        <div>
            <Container>
            <h1>New Account</h1>
            <br />
            <h5>Username:</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    value={name}
                    label="Username"
                    onChange={(e) => setName(e.target.value)}
                    />
                <br />
                <h5>Email:</h5>
                <Form.Control
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <h5>Password:</h5>
                <Form.Control
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <h6>Confirm password:</h6>
                <Form.Control
                    value={passwordConfirmation}
                    label="Confirm Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <div style={styles.buttonGroup}>
                <DPLLightWeightButton type="submit">Register</DPLLightWeightButton>
                <Nav.Link as={Link} to='/login'>
                <DPLGreyButton type="submit">Login to existing account</DPLGreyButton>
                </Nav.Link>
                </div>
            </Form>
            </Container>
        </div>
    );
}

const styles = {
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
}

export default Register;