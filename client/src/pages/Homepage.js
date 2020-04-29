import React from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <Editor />
            </div>
        )
    }
}

export default Homepage;