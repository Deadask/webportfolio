import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {useContext} from 'react';

import {Link, NavLink} from 'react-router-dom';

import UserContext from '../UserContext'

function AppNavbar() {
    
  // const [user,setUser] = useState(localStorage.getItem('email'));

  const {user} = useContext(UserContext)


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand as={Link} to = "/" >OlS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>            
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;