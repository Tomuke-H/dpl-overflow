import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Col, Container, Image, NavLink, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import User from '../components/User';


const Yearbook = () => {
  const [users, setUsers] = useState([])

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
            // <NavLink as={Link} to={`/users/${user.id}`}>
            <User key={user.id} user={user}/>
            // </NavLink>
          )
        })}
      </div>
      
    )}
  }


  return (
     <>
      <h1>yearbook</h1>
      <div className="card-group">
      {renderUsers()}
      </div>
     </>
  )};

export default Yearbook;