import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const OurNavbar = (props) => {
  const { user, handleLogout} = useContext(AuthContext)
  const history = useHistory();
  const { location } = props;

  const rightNavItems = () =>{
    if(user){
      return (
        <>
        <Link to='/edit_user'>
            Edit User
        </Link>
        <Nav.Item onClick={()=> handleLogout(history)}>Logout</Nav.Item>
        </>
      ) ;
    };
    return (
      <>
        <Link to='/login'>
            Login
        </Link>
        <Link to='/register'>
            Register
        </Link>
      </>
    )
  };

  return(
    <Navbar bg="dark">
      <Link to='/'>
          <Container>
        <Nav.Link href='/'>
        Home
          </Nav.Link>
          </Container>
      </Link >
      <Link to='/test_page'>
        <Container>
          <Nav.Link href='/test_page'>
            Test Page
          </Nav.Link>
        </Container>
      </Link>
      <Link to='/user'>
          <Container>
        <Nav.Link href='/user'>
        Profile
          </Nav.Link>
          </Container>
      </Link >
      <Link to='/tags'>
        <Container>
          <Nav.Link href='/tags'>
            Tags
          </Nav.Link>
        </Container>
      </Link>
      <Navbar.Collapse className="justify-content-end">{rightNavItems()}</Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(OurNavbar)