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
            history.push(`/users/${user.id}/profile`)
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


      const years = [...Array(new Date().getFullYear() - 2012).keys()].map((e)=>e+2013)

      const renderYears = () => { 
          return(years.map((year)=> {
              return(
            <Dropdown.Item onClick={(e) => setYear(year)}>{year}</Dropdown.Item>
      )}))}


    const seasonDrop = () => {
        return (
            <Dropdown>
              <Dropdown.Toggle style={styles.button}>Season</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => setSeason("Spring")}>Spring</Dropdown.Item>
                <Dropdown.Item onClick={(e) => setSeason("Summer")}>Summer</Dropdown.Item>
                <Dropdown.Item onClick={(e) => setSeason("Fall")}>Fall</Dropdown.Item>
                <Dropdown.Item onClick={(e) => setSeason("Winter")}>Winter</Dropdown.Item>
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

    // const dropDownItems = () => (
    //     <div>
    //     <Dropdown.Item onClick={(e) => getAllUsers()}>View All</Dropdown.Item>
    //     <Dropdown.Item onClick={(e) => getCohortUsers('Fall 2021')}>Fall 2021</Dropdown.Item>
    //     <Dropdown.Item onClick={(e) => getCohortUsers('Winter 2021')}>Winter 2021</Dropdown.Item>
    //     <Dropdown.Item onClick={(e) => getCohortUsers('Spring 2022')}>Spring 2022</Dropdown.Item>
    //     </div>
    //   )
    
    //   let dropDown = () => {
    //     return (
    //       <div class="dropdown">
    //          <DPLDropDownButton 
    //          class="dropbtn" 
    //          title="View by Cohort"
    //          onClick={()=>setShowDropDown(!showDropDown)}>
    //            Search by Cohort
    //         </DPLDropDownButton>
    //          {showDropDown && dropDownItems()}
    //     </div>
    //   )}

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
                {/* <input style={styles.rectangle}
                    value={cohort}
                    label="Cohort"
                    onChange={(e) => setCohort(e.target.value)}
                    /> */}
                    {seasonDrop()}
                    {yearDrop()}
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
                <DPLButton type="submit" style={{width: "160px", height: "50px", margin: "10px"}}>Update Password</DPLButton>
            </Form>
            </div>
            <br />
            <div style={styles.formdiv}>
            <DPLButton onClick={() => deleteAccount(id)} style={{width: "160px", height: "50px", margin: "10px"}}>Delete Account</DPLButton>
            </div>
            </Container>
        </div>
    );
}

const styles = {
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
    bigRectangle: {
        height: "100px",
        width: "600px",
        borderStyle: "none none solid none",
        background: "rgba(0, 0, 0, 0.0261145)",
        wordWrap: "breakWord",
        wordBreak: "breakAll",
        height: "80px",
    },
    button: {
        display: "inline-block",
        borderStyle: "solid",
        borderColor: "#6E54A3",
        borderRadius: "5px",
        fontWeight:"600px",
        fontSize: "14px",
        letterSpacing: ".7px",
        color:"#FFFFFF",
        backgroundColor:"#6E54A3",
        textAlign:"center",
        textTransform: "uppercase",
        width: "165px",
        height: "40px",
        marginTop: "8px",
      },
}

export default EditUser;