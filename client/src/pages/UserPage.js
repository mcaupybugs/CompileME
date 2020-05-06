import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import UserProfile from '../components/UserProfile';

class UserPage extends React.Component {

    render() {
        return (<div>
            <CustomNavbar></CustomNavbar>
            <UserProfile></UserProfile>
        </div>)
    }
}

export default UserPage;