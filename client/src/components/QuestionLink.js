import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import backend from '../api/backend';

class QuestionLink extends React.Component {

    constructor() {
        super();
        this.state = { questions: [] }
    }

    componentDidMount = async () => {
        const response = await backend.get('/questionList');
        // console.log(response.data[0]);
        this.setState({ questions: response.data });
        console.log(this.state.questions.length);

    }
    render() {
        return this.state.questions.map(question => {
            var link = "/question/" + question.code;
            return (<div>
                <ListGroup.Item action href={link}>{question.title}</ListGroup.Item>
            </div>)
        })
    }
}

export default QuestionLink;