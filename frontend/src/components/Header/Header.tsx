import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <Navbar  collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Container>
      <Navbar.Brand>
        <NavLink to='/'>
            Notes
        </NavLink>
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className='m-auto'>
      <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        </Nav>
        <Nav
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link> <NavLink to='/mynotes'>My Notes</NavLink></Nav.Link>
          <NavDropdown title="Profile" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
             Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header