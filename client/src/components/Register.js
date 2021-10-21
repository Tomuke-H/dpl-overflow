import React, { useContext, useState } from 'react'
import { Form, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import { DPLGreyButton, DPLLightWeightButton} from './DPLButtons';
import {Key} from './Key';

const Register = () => {
    const {handleRegister} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [check, setCheck] = useState('4DPLstud3nts0n1y')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const history = useHistory();
    const key = Key;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (check !== key) {
            alert(`Invalid Key for Registration!\nPlease reconfirm your key.\nYour Input: ${check}`);
            return;
          }
        if (password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
          }
        handleRegister({email, password, name}, history)
    };

    return (
        <Container style={styles.container}>
            <h1 style={styles.register}>Register</h1>
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
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <br />
                <p style={styles.label}>Password confirmation</p>
                <input style={styles.rectangle}
                    type = "password"
                    value={passwordConfirmation}
                    label="Confirm Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <br />
                <br />
                <p style={styles.label}>DPL Key</p>
                <input style={styles.rectangle}
                    type = "password"
                    value={check}
                    label="Enter Key"
                    onChange={(e) => setCheck(e.target.value)}
                    />
                <div style={styles.buttonGroup}>
                <DPLLightWeightButton type="submit">Register</DPLLightWeightButton>
                <Nav.Link as={Link} to='/login'>
                <DPLGreyButton type="submit">Login to existing account</DPLGreyButton>
                </Nav.Link>
                </div>
            </Form>
        </Container>
    );
}

const styles = {
    container: {
        display: "flex",
        flexFlow: "column wrap",
        height: "600px",
        width: "800px",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
        justifyContent: "center",
    },

    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    label: {
        height: "22px",

        fontFamily: "Open Sans",
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

    register: {
        // width: "104px",
        // height: "56px",

        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40.8px",
        lineHeight: "56px",
    },
}

export default Register;