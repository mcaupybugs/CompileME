import React from 'react';
import backend from '../api/backend';

class Question extends React.Component {

    componentDidMount = async () => {
        //console.log(window.location.pathname);
        var path = window.location.pathname;
        var res = path.split('/');
        //console.log(res[2]);
        this.state = { id: res[2] };
        //console.log(this.state.id);
        var string = "/questionDetail/" + this.state.id;
        const response = await backend.get(string);
        console.log(response.data[0]);
    }

    render() {
        return (<div>

        </div>)
    }
}

export default Question;