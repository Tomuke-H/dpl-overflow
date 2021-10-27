import axios from 'axios';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Dropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import User from '../components/UserComponents/User';


const Yearbook = () => {
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])

  const getAllUsers = async () => {
    try {
      let res = await axios.get("/api/users")
      setUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getAllUsers();
    getCohorts();
  },[])

  const getCohorts = async () => {
    try{
    let res = await axios.get(`/api/cohorts`)
    // console.log(res.data)
    setCohorts(res.data)
  } catch(err) {
    console.log(err)
  }
}

  const renderUsers = () => {
    if (users) {
    return (
      <div style={{display:"flex", flexWrap: 'wrap', margin: '35px'}}>
        {users.map((user,ind)=>{
          return (
            <NavLink as={Link} to={`/users/${user.id}/profile`} key={ind}>
              <User key={user.id} user={user}/>
            </NavLink>
          )
        })}
      </div>
      
    )}
  }

  const getCohortUsers = async (cohort) => {
    try{
      let res = await axios.get(`/api/cohort_yearbook?cohort=${cohort}`)
      setUsers(res.data.users)
    }catch(err){
      console.log(err)
    }
  }

  const renderOptions = () => { 
    return(cohorts.map((cohort)=> {
        return(
          <Dropdown.Item onClick={(e) => getCohortUsers(cohort.cohort)}>{cohort.cohort}</Dropdown.Item>
)}))}

  let dropDown = () => {
    return (
        <Dropdown>
          <Dropdown.Toggle style={styles.button}>Sort By Cohort</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => getAllUsers()}>View All</Dropdown.Item>
            {renderOptions()}
          </Dropdown.Menu>
        </Dropdown>
  )}

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h1 style={styles.yearbook}>YEARBOOK</h1>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '100px', marginTop: '90px'}}>
        {dropDown()}
       </div>
      </div>
      <div style={{border: '1.5px solid rgba(0, 0, 0, 0.3)', marginRight: '100px', marginLeft: '100px', marginTop: '30px', marginBottom: '30px', borderRadius: '6px'}}>
        <div style={{justifyContent: 'flex-start'}}>
          {renderUsers()}
        </div>
      </div>
    </div>
  )};

export default Yearbook;


const styles = {
  yearbook: {
  fontStyle: 'normal',
  fontWeight: '600px',
  textTransform: 'uppercase',
  flexDirection: 'flex-end',
  color: '#000000',
  marginLeft: '100px',
  marginTop: '90px'
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

