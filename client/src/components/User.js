import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardGroup, Container, Image, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = ({user, key}) => {

return (
  <div>
    {console.log("key:", key)}
    {console.log("user:", user)}
    {/* <CardGroup> */}
    <Card>
    <NavLink as={Link} to={`/user/${user.id}`}>
      <Container>
            <Image src={user.image} roundedCircle />
          <p>{user.name}</p>
      </Container>
      </NavLink>
      </Card>
    {/* </CardGroup> */}
  </div>
)
};

export default User;