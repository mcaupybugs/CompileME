import React from 'react';
import { NavDropdown, Container, Row } from 'react-bootstrap';
const googleIcon = require('../assets/google.png');
const profileUpdateIcon = require('../assets/profileUpdate.png');



class UserIcon extends React.Component {

    render() {
        return (
            <div>
                <NavDropdown className="dropleft" title={<div className="float-right" style={{ marginRight: "10px" }}><img class="rounded-circle border border-dark" src={this.props.image} width="32px" height="32px"></img></div>}>
                    <NavDropdown.Item disabled>Hi, {this.props.name}</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.props.signout}><img src={profileUpdateIcon} width="16px" height="16px" style={{ marginRight: "12px" }}></img>View Profile</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item onClick={this.props.signout}><img src={googleIcon} width="16px" height="16px" style={{ marginRight: "12px" }}></img>SignOut</NavDropdown.Item>
                </NavDropdown>
            </div>
        );
    }
}

export default UserIcon;