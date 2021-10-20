import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import {  Container, Form } from 'react-bootstrap';
import { Image } from "cloudinary-react";
import axios from 'axios';
import { DPLButton } from './DPLButtons';


const EditUser = (id) => {
    const {user, setUser} = useContext(AuthContext)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [cohort, setCohort] = useState(user.cohort)
    const [about_me, setAbout_me] = useState(user.about_me)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [selectedFile, setSelectedFile] = useState([])
    const current_password = user.password
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(`/api/users/${user.id}`, { name: name, email: email, cohort: cohort, about_me: about_me, password: password, passwordConfirmation: passwordConfirmation })
            setUser(res.data)
            history.push(`/users/${user.id}/profile`)
        } catch (err) {
            alert("error updating user")
            console.log(err)
        }
    }

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            // console.log(user)
            await axios.put("/api/auth/password", { password: password, password_confirmation: passwordConfirmation, current_password: current_password  })
            history.push("/user")
        } catch (err) {
            alert("error updating password")
            console.log(err)
        }

    }

    const deleteAccount = async () => {
        try {
            await axios.delete("/api/auth");
            localStorage.removeItem("access-token")
            setUser(null)
            history.push("/")
        } catch (error) {
            alert("error deleting account");
            console.log(error);
        }
    }

    const fileSelectedHandler = event => {
        try {
            console.log(event.target.files[0])
            setSelectedFile(event.target.files[0])
        } catch (err) {

        }
    }

    const fileUploadHandler = async () => {
        const file = new FormData();
        file.append("image", selectedFile, selectedFile.name);
        file.append("upload_preset", "jtofvmws")
        try {
            let res = await axios.put('/api/users/image/update', file)
            setUser(res.data)
            // console.log(res)
        } catch (err) {
            alert(err)
            console.log(err)
        }

    }


    return (
        <div>
            <Container>
            <h1>Edit Profile</h1>
            <br />
            <h5>Avatar:</h5>
            <input type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
            <br />
            <Image
                style={{ width: '137px', height: '137px'}}
                cloudName="dm7eqie1u" 
                publicID={user.image}
            />
            <br />
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
                <DPLButton type="submit">Update Profile</DPLButton>
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
                <DPLButton type="submit">Update Password</DPLButton>
            </Form>
            <br />
            <br />
            <br />
            <DPLButton onClick={() => deleteAccount(id)}>Delete Account</DPLButton>
            </Container>
        </div>
    );
}

export default EditUser;