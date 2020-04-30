import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import key from '../key/key';
import { Nav } from 'react-bootstrap';
const url = require('../assets/google.png');

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: key.googleKey,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = isSignedIn => {
        this.googleUser = this.auth.currentUser.get();
        var values = {
            userId: this.googleUser.getBasicProfile().getId(),
            name: this.googleUser.getBasicProfile().getName(),
            image: this.googleUser.getBasicProfile().getImageUrl(),
            email: this.googleUser.getBasicProfile().getEmail()
        } // to get the user name 
        //console.log(values); // display the user name
        this.auth.currentUser.get().getId();
        if (isSignedIn) {
            this.props.signIn(values);
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <Nav.Link onClick={this.onSignOutClick} className="btn btn-outline-dark">
                    <img src={url} width="24px" height="24px" style={{ marginRight: "3px" }}></img>
                    Sign Out
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link onClick={this.onSignInClick} className="btn btn-outline-dark">
                    <img src={url} width="24px" height="24px" style={{ marginRight: "3px" }}></img>                    Sign In with google
                </Nav.Link>
            )
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);