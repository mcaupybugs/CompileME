import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

class CustomNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="light" expand="md" style={{ marginBottom: "10px" }}>
                    <Navbar.Brand href="/"><img alt="" src="/images/icons/icon.png" width="32" height="32" className="d-inline-block align-top" style={{ marginRight: "10px" }} />Compile Me!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link style={{ color: "black" }} href="/compiler">Compiler</Nav.Link>
                            <Nav.Link style={{ color: "black" }} href="/">Home</Nav.Link>
                        </Nav>
                        <Nav >
                        <GoogleOAuthProvider clientId="214049362911-8s33p6e1ntkaiscgle6tvbj264hdb87f.apps.googleusercontent.com">
                            <GoogleAuth />
                        </GoogleOAuthProvider>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div >
        )
    }
}

export default CustomNavbar;