import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <Navbar bg="white" fixed="bottom" style={{borderTop: 'solid 2px #C4C4C4', padding: '5px'}}>
      <Nav.Item>
        <Nav.Link href='https://twitter.com/devpointlabs' target="_blank">twitter</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='https://www.facebook.com/DevPointLabs/' target="_blank">facebook</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='https://www.instagram.com/devpointlabs/' target="_blank">instagram</Nav.Link>
      </Nav.Item>
    </Navbar>
  )
}

export default Footer;