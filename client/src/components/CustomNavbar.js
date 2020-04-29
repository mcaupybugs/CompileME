import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
class CustomNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="light" expand="md" style={{ marginBottom: "10px" }}>
                    <Navbar.Brand href="/"><img alt="" src="/images/icons/icon.png" width="32" height="32" className="d-inline-block align-top" style={{ marginRight: "10px" }} />Compile Me!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Compiler</Nav.Link>
                            <Nav.Link href="#link">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}

export default CustomNavbar;