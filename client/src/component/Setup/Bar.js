import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Bar = () => {
  return (
    <>
    
  <Navbar bg="dark" variant="dark">
    <Container>
    <Link to="/" >
        <Navbar.Brand>Home</Navbar.Brand>
    </Link>
    <Nav className="me-auto">
      
      <Link to="/gov" >
            <Nav.Link>Governorat</Nav.Link>
      </Link>
      
      <Nav.Link>Expediteur</Nav.Link>
      <Nav.Link>Magasin</Nav.Link>
      <Nav.Link>Livreur</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>


  )
}

export default Bar