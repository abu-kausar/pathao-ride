import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const NavBar = () => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <Navbar className='navCSS' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">Pathao</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto'></Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/destination">Destination</Nav.Link>
                        <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contach</Nav.Link>
                        {
                            loggedInUser.isSignedIn ? <Nav.Link>{loggedInUser.email}</Nav.Link> :
                             <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                        
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;