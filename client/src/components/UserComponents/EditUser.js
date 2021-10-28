import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {  Container, Form, Dropdown } from 'react-bootstrap';
import { Image } from "cloudinary-react";
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { DPLButton } from '../DPLButtons';


const EditUser = (id) => {
    const {user, setUser} = useContext(AuthContext)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [season, setSeason] = useState("")
    const [year, setYear] = useState("")
    const [cohort, setCohort] = useState(user.cohort)
    const [about_me, setAbout_me] = useState(user.about_me)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [selectedFile, setSelectedFile] = useState([])
    const current_password = user.password
    const history = useHistory();
    const [showDelete, setShowDelete] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(`/api/users/${user.id}`, { 
                name: name, 
                email: email, 
                cohort: cohort, 
                about_me: about_me })
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
            await axios.put("/api/auth/password", { 
                password: password, 
                password_confirmation: passwordConfirmation, 
                current_password: current_password  })
            history.push(`/users/${user.id}/profile`)
        } catch (err) {
            alert("error updating password")
            console.log(err)
        }

    }

    const deleteAccountConfirm = () => {
        return(
            <div>
            <h3 style={styles.label}> Are you sure you want to delete your account? </h3>
            <DPLButton 
            type="submit" 
            style={{height: "50px", margin: "10px"}}
            onClick={deleteAccount(id)}>Yes, Delete My Account</DPLButton>
            </div>
        )
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

    const updateCohort = (season, year) => {
        setCohort(`${season} ${year}`)
    }

    const updateSeason = (season) => {
        setSeason(season)
        updateCohort(season, year)
    }

    const updateYear = (year) => {
        setYear(year)
        updateCohort(season, year)
    }
    
    


      const years = [...Array(new Date().getFullYear() - 2012).keys()].map((e)=>e+2013)

      const renderYears = () => { 
          return(years.map((year)=> {
              return(
            <Dropdown.Item onClick={(e) => updateYear(year)}>{year}</Dropdown.Item>
      )}))}


    const seasonDrop = () => {
        return (
            <Dropdown>
              <Dropdown.Toggle style={styles.button}>Season</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => updateSeason("Spring")}>Spring</Dropdown.Item>
                <Dropdown.Item onClick={(e) => updateSeason("Summer")}>Summer</Dropdown.Item>
                <Dropdown.Item onClick={(e) => updateSeason("Fall")}>Fall</Dropdown.Item>
                <Dropdown.Item onClick={(e) => updateSeason("Winter")}>Winter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
      )}
            
      const yearDrop = () => {
        return (
            <Dropdown>
              <Dropdown.Toggle style={styles.button}>Year</Dropdown.Toggle>
              <Dropdown.Menu>
                {renderYears()}
              </Dropdown.Menu>
            </Dropdown>
      )}

    return (
        <div>
            <Container style={styles.container}>
            <h1 style={styles.header}>Edit Profile</h1>
            <br />
            <div>
            <h2 style={styles.label}>Update Profile Picture</h2>
            <input type="file" onChange={fileSelectedHandler} />
            <DPLButton 
            style={{margin:"10px"}}
            onClick={fileUploadHandler}>
                Upload
            </DPLButton>
            <br />
            <br />
            <Image
            style={{ width: '137px', height: '137px'}}
                cloudName="dm7eqie1u" 
                publicID={user.image}
            />
            </div>
            <br />
            <div style={styles.formdiv}>
            <Form onSubmit={handleSubmit}>
                <h2 style={styles.label}>Update Username</h2>
                    <input style={styles.rectangle}
                    value={name}
                    label="Username"
                    onChange={(e) => setName(e.target.value)}
                    />
                <br />
                <h2 style={styles.label}>Update Email</h2>
                <input style={styles.rectangle}
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <h2 style={styles.label}>Update Cohort</h2>
                <p style={styles.pRectangle}>
                    {cohort}
                    </p>
                    <div style={styles.cohort}>
                    {seasonDrop()}
                    {yearDrop()}
                    </div>
                <br />
                <h2 style={styles.label}>Update About Me</h2>
                <textarea style={styles.bigRectangle}
                    type="text"
                    value={about_me}
                    label="About Me"
                    onChange={(e) => setAbout_me(e.target.value)}
                    />
                <br />
                <DPLButton style={{margin: "10px"}} type="submit">Update Profile</DPLButton>
            </Form>
            </div>
                <br />
            <div style={styles.formdiv}>
            <Form onSubmit={handlePasswordUpdate}>
            <h3 style={styles.label}>New Password</h3>
            <input style={styles.rectangle}
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
            <h3 style={styles.label}>Confirm Password</h3>
            <input style={styles.rectangle}s
                    value={passwordConfirmation}
                    label="Confirm New Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                <br />
                <DPLButton type="submit" style={{height: "50px", margin: "10px"}}>Update Password</DPLButton>
            </Form>
            </div>
            <br />
            <div style={styles.formdiv}>
            <DPLButton onClick={() => setShowDelete(!showDelete)} style={{height: "50px", margin: "10px"}}>Delete Account</DPLButton>
            {showDelete && deleteAccountConfirm()}
            </div>
            </Container>
        </div>
    );
}

const styles = {
    cohort: {
        display: "flex",
        flexDirection: "row"
    },
    container: {
        marginTop: "26px",
        marginBottom: "126px",
        display: "flex",
        width: "1500px",
        flexFlow: "column",
        justifyContent: "center",
        flexDirection: "column",
    },
    formdiv: {
        marginTop: "26px"
    },
    header: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40.8px",
        lineHeight: "56px",
    },
    label: {
        marginTop: "16px",
        height: "22px",
        fontStyle: "normal",
        fontWeight: "500",
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
    pRectangle: {
        paddingTop: "13px",
        height: "50px",
        width: "600px",
        borderBottom: "2px solid #767676",
        background: "rgba(0, 0, 0, 0.0261145)",
    },
    bigRectangle: {
        height: "100px",
        width: "600px",
        borderStyle: "none none solid none",
        borderBottom: "2px solid #767676",
        background: "rgba(0, 0, 0, 0.0261145)",
        wordWrap: "breakWord",
        wordBreak: "breakAll",
        height: "80px",
    },
    button: {
        marginLeft: "10px",
        marginRight: "10px",
        display: "inline-block",
        borderStyle: "solid",
        borderColor: "#6E54A3",
        borderRadius: "5px",
        fontWeight:"600",
        fontSize: "14px",
        letterSpacing: ".7px",
        color:"#FFFFFF",
        backgroundColor:"#6E54A3",
        textAlign:"center",
        textTransform: "uppercase",
        width: "140px",
        height: "33px",
        marginTop: "8px",
      }

}

export default EditUser;