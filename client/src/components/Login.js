import React, { useContext, useState } from 'react'
import { Form, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider'
import { DPLGreyButton, DPLLightWeightButton } from './DPLButtons';

const Login = (props) => {
    const {handleLogin} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email)
        alert("Email cannot be blank.")
        else if (!password)
        alert("Password cannot be blank.")
        else handleLogin({email, password}, history)
    }

    return (
        <Container style={styles.container}>
            <h1 style={styles.login}>Login</h1>
            <br />
            <Form onSubmit={handleSubmit}>
                <p style={styles.label}>Email</p>
                <input style={styles.rectangle}
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <br />
                <p style={styles.label}>Password</p>
                <input style={styles.rectangle}
                    type = "password"
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
    container: {
        display: "flex",
        flexFlow: "column wrap",
        placeContent: "stretch space-around",
        height: "500px",
        width: "800px",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },

    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    label: {
        height: "22px",

        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "22px",

        color: "#000000",
    },

    rectangle: {
        height: "50px",
        width: "600px",
        borderStyle: "none none solid none",

        background: "rgba(0, 0, 0, 0.0261145)",
    },

    login: {
        width: "104px",
        height: "56px",

        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40.8px",
        lineHeight: "56px",
    },
}

export default Login;