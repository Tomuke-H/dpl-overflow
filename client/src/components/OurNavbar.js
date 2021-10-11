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
        <Nav.Link as={Link} to="/users">
          <Container>
            Profile
          </Container>
        </Nav.Link>

        <Nav.Link as={Link} to='/user/edit'>
          <Container>
            Edit Profile
          </Container>
        </Nav.Link>

        <Nav.Link as={Link} onClick={()=> handleLogout(history)} to='/login'>
          <Container>
            Logout
          </Container>
        </Nav.Link>
        </>
      ) ;
    };
    return (
      <>
        <Nav.Link as={Link} to='/login'>
          <Container>
            Login
          </Container>
        </Nav.Link>
        <Nav.Link as={Link} to='/register'>
          <Container>
            Register
          </Container>
        </Nav.Link>
      </>
    )
  };

  return(
    <span>
    <Navbar bg="dark">
      <Nav.Link as={Link} to='/'>
        <Container>
            Home
        </Container>
      </Nav.Link >
      <Nav.Link as={Link} to='/Dashboard'>
        <Container>
            Dashboard
        </Container>
      </Nav.Link>
      <Nav.Link as={Link} to='/tags'>
        <Container>
            Tags
        </Container>
      </Nav.Link>
      <Nav.Link as={Link} to='/yearbook'>
        <Container>
            Yearbook
        </Container>
      </Nav.Link>
      <Nav.Link as={Link} to='/leaderboard'>
        <Container>
            Leaderboard
        </Container>
      </Nav.Link>
      <Navbar.Collapse className="justify-content-end">{rightNavItems()}</Navbar.Collapse>
    </Navbar>
    </span>
  );
}

export default withRouter(OurNavbar)