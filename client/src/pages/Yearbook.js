import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import User from '../components/User';


const Yearbook = () => {
  const [users, setUsers] = useState([])

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
  },[])

  const renderUsers = () => {
    if (users) {
    return (
      <div style={{display:"flex", flexWrap: 'wrap'}}>
        {users.map((user)=>{
          return (
            <NavLink as={Link} to={`/users/${user.id}/profile`}>
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

  let dropDown = () => {
    return (
      <div>
         <DropdownButton title="View by Cohort">
          <Dropdown.Item onClick={(e) => getAllUsers()}>View All</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getCohortUsers('Fall 2021')}>Fall 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getCohortUsers('Winter 2021')}>Winter 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getCohortUsers('Spring 2022')}>Spring 2022</Dropdown.Item>
      </DropdownButton>
    </div>
  )}

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        {dropDown()}
       </div> */}
      <div>
        <h1 style={styles.yearbook}>YEARBOOK</h1>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        {dropDown()}
       </div>
      </div>
      <div>
        {renderUsers()}
      </div>
    </div>
  )};

export default Yearbook;

const styles = {
  yearbook: {
  width: '160px',
  height: '41px',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '30px',
  lineHeight: '41px',
  textTransform: 'uppercase',

  color: '#000000'
}
}