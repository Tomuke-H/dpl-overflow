import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import { Button, Container, Form } from 'react-bootstrap';
import { Image } from "cloudinary-react";
import axios from 'axios';


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

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("image", selectedFile, selectedFile.name);
        fd.append("upload_preset", "jtofvmws")
        try {
            axios.post('https://api.cloudinary.com/v1_1/dm7eqie1u/image/upload', fd)
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
            {/* <Image 
                style={{width: 300}}
                cloudName="dm7eqie1u" 
                publicID="https://res.cloudinary.com/dm7eqie1u/image/upload/v1634071912/sample.jpg"
            /> */}
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