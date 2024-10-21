import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user from localStorage and update login state
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Product List</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/action1">Action</NavDropdown.Item>
              <NavDropdown.Item href="/action2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="/action3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/separated-link">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right side - Login/Signup or Logout + Dashboard for logged-in users */}
          <Nav className="ms-auto">
            {loggedIn ? (
              <>
                {/* Show Dashboard link only for logged-in users */}
                <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary" className="me-2" onClick={() => navigate('/login')}>Sign In</Button>
                <Button variant="outline-success" onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
