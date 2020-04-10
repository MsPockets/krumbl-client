import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#create-recipe">Post a Recipe</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#recipes">Home</Nav.Link>
  </Fragment>
)

const NavbarStyle = {
  backgroundColor: '#edbe32'
}
const logo = {
  maxHeight: '25px',
  display: 'inline'
}
const Header = ({ user }) => (
  <Navbar style={NavbarStyle} expand="md">
    <Nav.Link href="#recipes">
      <img style={logo} src="https://i.ya-webdesign.com/images/cookie-icon-png-16.png"></img><p style={logo}>Krumbl</p>
    </Nav.Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
