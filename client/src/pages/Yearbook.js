import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import User from '../components/User';
import styled from "styled-components";


const Yearbook = () => {
  const [users, setUsers] = useState([])
  const [showDropDown, setShowDropDown] = useState(false)

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
      <div style={{display:"flex", flexWrap: 'wrap', margin: '32px'}}>
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

  const dropDownItems = () => (
    <div>
    <Dropdown.Item onClick={(e) => getAllUsers()}>View All</Dropdown.Item>
    <Dropdown.Item onClick={(e) => getCohortUsers('Fall 2021')}>Fall 2021</Dropdown.Item>
    <Dropdown.Item onClick={(e) => getCohortUsers('Winter 2021')}>Winter 2021</Dropdown.Item>
    <Dropdown.Item onClick={(e) => getCohortUsers('Spring 2022')}>Spring 2022</Dropdown.Item>
    </div>
  )

  let dropDown = () => {
    return (
      <div class="dropdown">
         <DPLDropDownButton 
         class="dropbtn" 
         title="View by Cohort"
         onClick={()=>setShowDropDown(!showDropDown)}>
           Search by Cohort
        </DPLDropDownButton>
         {showDropDown && dropDownItems()}
    </div>
  )}

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h1 style={styles.yearbook}>YEARBOOK</h1>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '149px', marginTop: '90px'}}>
        {dropDown()}
       </div>
      </div>
      <div style={{border: '1px solid rgba(0, 0, 0, 0.3)', marginRight: '149px', marginLeft: '149px', marginTop: '90px', borderRadius: '6px'}}>
        <div style={{justifyContent: 'flex-start'}}>
          {renderUsers()}
        </div>
      </div>
    </div>
  )};

export default Yearbook;

const DPLDropDownButton = styled.button`
display:inline-block;
padding: 8px 16px;
margin: 9px;
border-style: solid;
border-color: #6E54A3;
border-radius: 5px;
font-family:'Open Sans';
font-weight:600;
font-size: 14px;
letter-spacing: .7px;
color:#FFFFFF;
background-color:#6E54A3;
text-align:center;
text-transform: uppercase;
`

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
  flexDirection: 'flex-end',
  color: '#000000',
  marginLeft: '149px',
  marginTop: '90px'
}
}

