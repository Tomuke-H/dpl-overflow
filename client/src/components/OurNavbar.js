import React, { useContext } from 'react'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import { DPLButton, DPLGetStarted } from './DPLButtons'
import DplOLogo from '../../src/icons/DevPointOverflow_LogoOnly.png'


const OurNavbar = (props) => {
  const { user, handleLogout} = useContext(AuthContext)
  const history = useHistory();

  const rightNavItems = () =>{
    if(user){
      return (
        <>
        <Nav.Link as={Link} to={'/new_question'}>
          <DPLButton>ASK A QUESTION</DPLButton>
        </Nav.Link>
          <NavDropdown align='end' title={<Image roundedCircle src={user.image} style={styles.profile}/>} id="basic-nav-dropdown">
            <Nav.Link as={Link} to={`/users/${user.id}/profile`}>
              <Container>
                View Profile
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
        <Nav.Link as={Link} to='/register'>
          <DPLGetStarted>
            GET STARTED
          </DPLGetStarted>
        </Nav.Link>
        <Nav.Link as={Link} to='/login'>
          <DPLButton>
            LOGIN
          </DPLButton>
        </Nav.Link>
      </>
    )
  };

  const leftNavItems = () => {
    if(user){
      return (
        <>
          <Nav.Link as={Link} to='/Dashboard'>
            <Container style={styles.navItem}>
                Questions
            </Container>
          </Nav.Link>
          <Nav.Link as={Link} to='/tags'>
            <Container style={styles.navItem}>
                Tags
            </Container>
          </Nav.Link>
          <Nav.Link as={Link} to='/yearbook'>
            <Container style={styles.navItem}>
                Yearbook
            </Container>
          </Nav.Link>
          <Nav.Link as={Link} to='/leaderboard'>
            <Container style={styles.navItem}>
                Leaderboard
            </Container>
          </Nav.Link>
        </>
      )
    }
  }

  return(
    <span>
    <Navbar bg="white" fixed="top" collapseOnSelect style={{borderBottom: 'solid 2px #C4C4C4', padding: '0px'}}>
      <Nav.Link style={styles.logo} as={Link} to='/'>
        <Image src={DplOLogo} style={styles.logo}/>
      </Nav.Link >
      <Navbar.Collapse className="justify-content-start">{leftNavItems()}</Navbar.Collapse>
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
  },
  navItem: {
    color: '#757575'
  },
  logo: {
    width: '90px',
    height: '90px',
    margin: '0px',
    padding: '0px'
  }
}
