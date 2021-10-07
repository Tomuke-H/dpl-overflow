import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios';


const EditUser = (id) => {
    const {user, setUser} = useContext(AuthContext)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [cohort, setCohort] = useState(user.cohort)
    const [about_me, setAbout_me] = useState(user.about_me)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const current_password = user.password
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(`/api/users/${user.id}`, { name: name, email: email, cohort: cohort, about_me: about_me, password: password, passwordConfirmation: passwordConfirmation })
            setUser(res.data)
            history.push("/user")
        } catch (err) {
            alert("error updating user")
            console.log(err)
        }
    }

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(user)
            await axios.put("/api/auth/password", { password: password, password_confirmation: passwordConfirmation, current_password: current_password  })
            history.push("/user")
        } catch (err) {
            alert("error updating password")
            console.log(err)
        }

    }

    const deleteAccount = async (id) => {
        try {
            console.log(user)
            let res = await axios.delete(`/api/users/${user.id}`);
            let filterAccounts = user.filter((a) => a.id !== id);
            setUser(filterAccounts);
            history.push("/")
        } catch (error) {
            alert("error deleting account");
            console.log(error);
        }
    }


    return (
        <div>
            <Container>
            <h1>Edit Profile</h1>
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
                <h5>Cohort:</h5>
                <Form.Control
                    value={cohort}
                    label="Cohort"
                    onChange={(e) => setCohort(e.target.value)}
                    />
                <br />
                <h5>About Me:</h5>
                <Form.Control
                    value={about_me}
                    label="About Me"
                    onChange={(e) => setAbout_me(e.target.value)}
                    />
                <Button type="submit">Update Profile</Button>
            </Form>
                <br />
                <br />
                <br />
                <h5>New Password:</h5>
            <Form onSubmit={handlePasswordUpdate}>
                <Form.Control
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <h6>Confirm new password:</h6>
                <Form.Control
                    value={passwordConfirmation}
                    label="Confirm New Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <Button type="submit">Update Password</Button>
            </Form>
            <br />
            <br />
            <br />
            <Button onClick={() => deleteAccount(id)}>Delete Account</Button>
            </Container>
        </div>
    );
}

export default EditUser;