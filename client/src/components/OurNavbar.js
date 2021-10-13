import React, { useContext } from 'react'
import { Container, Image, Nav, Navbar, Button, Dropdown, NavDropdown } from 'react-bootstrap'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import Beaker from '../../src/icons/Beaker-black-60.png'

const OurNavbar = (props) => {
  const { user, handleLogout} = useContext(AuthContext)
  const history = useHistory();
  const { location } = props;

  const rightNavItems = () =>{
    if(user){
      return (
        <>
        <Nav.Link as={Link} to='new_question'>
          <Button>Ask a Question</Button>
        </Nav.Link>

        {/* <Nav.Link as={Link} to={`/users/${user.id}`}>
          <Container>
            <Image roundedCircle src={user.image} style={styles.profile}/>
          </Container>
        </Nav.Link> */}
          <NavDropdown align='end' title={<Image roundedCircle src={user.image} style={styles.profile}/>} id="basic-nav-dropdown">
            <Nav.Link as={Link} to={`/users/${user.id}`}>
              <Container>
                View Profile
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
          </NavDropdown>

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
    <Navbar collapseOnSelect style={{borderBottom: 'solid 2px black'}}>
      <Nav.Link as={Link} to='/'>
        <Container>
            <Image src={Beaker} />
        </Container>
      </Nav.Link >
      <Nav.Link as={Link} to='/Dashboard'>
        <Container>
            Questions
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

const styles = {
profile: {
// position: 'absolute',
width: '46px',
height: '46px',
left: '1364px',
top: '12px'
}
}
