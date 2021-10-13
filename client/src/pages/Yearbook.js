import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import User from '../components/User';


const Yearbook = () => {
  const [users, setUsers] = useState([])
  const [cohort, setCohort] = useState("")

  const getUsers = async () => {
    try {
      let res = await axios.get("/api/users")
      setUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getUsers();
  },[])

  const renderUsers = () => {
    if (users) {
    return (
      <div>
        {users.map((user)=>{
          return (
            <NavLink as={Link} to={`/users/${user.id}`}>
              <User key={user.id} user={user}/>
            </NavLink>
          )
        })}
      </div>
      
    )}
  }

  let cohorts = [
    'Spring 2021',
    'Summer 2021',
    'Fall 2021',
    'Winter 2021',
    'Spring 2022',
    'Summer 2022'
  ]

  let dropDown = () => {
    console.log("cohort:", cohort)
    return (
      <div>
        <Dropdown>
        <Dropdown.Toggle variant="success">
          Cohort
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {cohorts.map((c)=> {
              return <Dropdown.Item onChange={()=>setCohort(c)}>{c}</Dropdown.Item>
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )}

  return (
    <div>
      {dropDown()}
     <div>
      <h1 style={styles.yearbook}>YEARBOOK</h1>
    </div>
    <div style={styles.grid}>
      {renderUsers()}
     </div>
     </div>
  )};

export default Yearbook;

const styles = {
  yearbook: {
  position: 'absolute',
  width: '160px',
  height: '41px',
  left: '94px',
  top: '147px',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '30px',
  lineHeight: '41px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  textTransform: 'uppercase',

  color: '#000000'
},
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center",
    position: 'relative'
  }
}