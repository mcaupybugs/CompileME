import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import UserIcon from './UserIcon';
import { GoogleLogin } from '@react-oauth/google';
import { Nav, NavDropdown, Container, Row } from 'react-bootstrap';
const url = require('../assets/google.png');
const key = process.env.googleKey

class GoogleAuth extends React.Component {
    render(){
        return(
        <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              this.onSignInClick();
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )
    }

    // Fix google auth
} 

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);