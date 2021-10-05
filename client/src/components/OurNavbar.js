import React, { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
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
          <Nav.Link href='/edit_user'>
            Edit User
          </Nav.Link >
        </Link>
        <Nav.Item onClick={()=> handleLogout(history)}>Logout</Nav.Item>
        </>
      ) ;
    };
    return (
      <>
        <Link to='/login'>
          <Link>
            Login
          </Link >
        </Link>
        <Link to='/register'>
          <Link>
            Register
          </Link >
        </Link>
      </>
    )
  };

  return(
    <Navbar>
      <Link to='/'>
        Home
      </Link >
      <Link to='/test_page'>
          Test Page
      </Link>
      <Link to='/user'>
        Profile
      </Link>
      <Navbar>{rightNavItems()}</Navbar>
    </Navbar>
  );
}

export default withRouter(OurNavbar)