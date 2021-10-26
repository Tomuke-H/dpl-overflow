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
    const [check, setCheck] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const history = useHistory();
    const key = Key;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email)
            alert("Email cannot be blank.")
        else if (password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
          }
          else if (check !== key) {
            alert(`Invalid Key for Registration!\nPlease reconfirm your key.\nYour Input: ${check}`);
            return;
          }
        else handleRegister({email, password, name}, history)
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
        placeContent: "stretch center",
        height: "72vh",
        width: "80vw",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "6px",
        marginTop: "40px",
    },

    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    label: {
        height: "22px",

        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "22px",

        color: "#000000",
    },

    rectangle: {
        height: "43px",
        width: "600px",
        borderStyle: "none none solid none",

        background: "rgba(0, 0, 0, 0.0261145)",
    },

    register: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40.8px",
        lineHeight: "56px",
    },
}

export default Register;