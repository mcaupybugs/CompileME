import React from 'react';
import Editor from '../components/Editor';
import CustomNavbar from '../components/CustomNavbar';

class CompilerPage extends React.Component {

    render() {
        return (
            <div>
                <CustomNavbar />
                <Editor />
            </div>
        )
    }
}

export default CompilerPage;