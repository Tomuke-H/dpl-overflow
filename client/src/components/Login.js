import React, { useContext, useState } from 'react'
import { Form, Button, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider'
import DPLGreyButton from './DPLGreyButton';
import DPLLightWeightButton from './DPLLightWeightButton';

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
        <Container>
            <h1>Login</h1>
            <br />
            <h5>Email</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <h5>Password</h5>
                <Form.Control
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={styles.buttonGroup}>
                <DPLLightWeightButton type="submit">Login</DPLLightWeightButton>
                <Nav.Link as={Link} to='/register'>
                    <DPLGreyButton>Create a new account</DPLGreyButton>
                </Nav.Link>
                </div>
            </Form>
        </Container>
    );
};

const styles = {
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
}

export default Login;