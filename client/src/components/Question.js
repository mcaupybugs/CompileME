import React from 'react';
import backend from '../api/backend';
import { Card } from 'react-bootstrap';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = { id: "", data: "" };
    }


    componentDidMount = async () => {
        var path = window.location.pathname;
        var res = path.split('/');
        this.setState({ id: res[2] });
        var string = "/questionDetail/" + res[2];
        //console.log(string);
        const response = await backend.get(string);
        //console.log(response.data[0]);
        this.setState({ data: response.data[0] });
    }

    render() {
        return (<div>
            <Card style={{ marginLeft: "10px" }}>
                <Card.Header >{this.state.data.title}  <span style={{ fontSize: "12px", float: "right" }}>Problem Code : {this.state.data.code}</span></Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Problem Statement
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.content}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Input Detail
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.input}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Output Detail
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.output}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Constraints
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.constraints}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Tasks
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.tasks}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Example Input
                     </Card.Title>
                    <Card.Text>
                        <pre>{this.state.data.exampleInput}</pre>
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Example Output
                     </Card.Title>
                    <Card.Text>
                        <pre>{this.state.data.exampleOutput}</pre>
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                        Explaination
                     </Card.Title>
                    <Card.Text>
                        {this.state.data.explaination}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>)
    }
}

export default Question;