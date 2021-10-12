import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Card, CardGroup, Container, Image, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import EditUser from "./EditUser";

const User = ({user}) => {
 const { user: currentUser } = useContext(AuthContext)


return (
  <>
  <div>
      <Container style={{textAlign:'center'}}>
            <Image style={styles.circle} alt="100x100" src={user.image} roundedCircle data-holder-rendered="true"/>
          <p>{user.name}</p>
      </Container>
  </div>
</>
)
};

export default User;

const styles = {
  circle: {
    width: '137px',
    height: '137px',
    left: '104.5px',
    top: '265px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center"
  }
}