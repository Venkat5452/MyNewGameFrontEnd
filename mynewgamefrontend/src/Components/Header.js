import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import IMG1 from '../Images/img2.png'
import { useEffect, useState } from 'react';
import { CiLogout , CiLogin} from "react-icons/ci";
function Header() {
  const [flag,setflag]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem('logintoken')!==null) {
      setflag(true);
    }
    localStorage.removeItem('forregister');
  },[setflag])
  return (
    <div>
      <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" sticky="">
      <Container className="text-primary d-flex">
        <Navbar.Brand href="/dashboard">
          <div><img
            src={IMG1}
            width="70"
            height="70"
            className="d-inline-block align-top rounded rounded-3"
            alt="logo"
          /></div></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggler" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
          <NavDropdown title="Game Rules" id="basic-nav-dropdown">
              <NavDropdown.Item ><h6 className='text-dark'>Should Guess Number Between 1 to 20</h6></NavDropdown.Item>
              <NavDropdown.Item ><h6>One Round is for 100 points</h6></NavDropdown.Item>
              <NavDropdown.Item ><h6>Points : 100 - No of wrong guesses</h6></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link style={{ color: "white" }} href="/"></Nav.Link>
            <Nav.Link style={{ color: "white" }} href="/leaderboard">LeaderBoard</Nav.Link>
            {flag && <Nav.Link style={{ color: "white" }} href="/logout">Log out<CiLogout /></Nav.Link>}
            {!flag && <Nav.Link style={{ color: "white" }} href="/">Login<CiLogin /></Nav.Link>}
            {!flag && <Nav.Link style={{ color: "white" }} href="/signup">Sign Up<CiLogin /></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;