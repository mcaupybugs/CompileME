import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import history from '../history';

import { Card, Container, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import backend from '../api/backend';
var fs = require('fs');

class AddQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            questionCode: "",
            questionTitle: "",
            questionBody: "",
            questionTestcaseInput: "",
            questionTestcaseOutput: "",
            submitStatus: ""
        }
    }
    questionCodeChange = (event) => {
        this.setState({ questionCode: event.target.value })
    }
    questionTitleChange = (event) => {
        this.setState({ questionTitle: event.target.value })
    }
    questionBodyChange = (event) => {
        this.setState({ questionBody: event.target.value })
    }

    onTestCaseChangeInput = async (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = (event.target.result);
            //console.log(text);
            this.setState({ questionTestcaseInput: text });
        };
        reader.readAsText(event.target.files[0]);
    }
    onTestCaseChangeOutput = async (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = (event.target.result);
            //console.log(text);
            this.setState({ questionTestcaseOutput: text });
        };
        reader.readAsText(event.target.files[0]);
    }

    submitQuestion = async () => {
        const response = await backend.post('/newQuestion', { code: this.state.questionCode, title: this.state.questionTitle, content: this.state.questionBody, testCaseInput: this.state.questionTestcaseInput, testCaseOutput: this.state.questionTestcaseOutput });
        //console.log(response);
        if (response.data == "Upload Success") {
            this.setState({ submitStatus: response.data });
            history.push('/');
            //console.log(this.state.submitStatus);
        } else {
            this.setState({ submitStatus: response.data })
        }
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <Container>
                    <Card>
                        <Card.Header>
                            Add Question
                        </Card.Header>
                        <Card.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Code : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionCode} onChange={this.questionCodeChange}></FormControl>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Title : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionTitle} onChange={this.questionTitleChange}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Body : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="10" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionBody} onChange={this.questionBodyChange} ></FormControl>
                            </InputGroup>
                            {/* <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>TestCases : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="file" ></FormControl>
                            </InputGroup> */}
                            <InputGroup>
                                <Form>
                                    <Form.File id="custom-file" label="Input test case" accept=".txt" onChange={this.onTestCaseChangeInput} custom></Form.File>
                                </Form>
                            </InputGroup>
                            <InputGroup>
                                <Form>
                                    <Form.File id="custom-file" label="Output test case" accept=".txt" onChange={this.onTestCaseChangeOutput} custom></Form.File>
                                </Form>
                            </InputGroup>
                            <Card.Body id="submitStatus" className="border border-dark" style={{ color: "blue" }}>{this.state.submitStatus} </Card.Body>
                        </Card.Body>
                        <Button variant="primary" onClick={this.submitQuestion}>Submit Question</Button>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default AddQuestion;