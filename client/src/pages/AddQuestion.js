import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import history from '../history';

import { Card, Container, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import backend from '../api/backend';

class AddQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            questionCode: "",
            questionTitle: "",
            questionBody: "",
            questionInputDescription: "",
            questionOutputDescription: "",
            questionConstraintsDescription: "",
            questionTasks: "",
            questionExampleInput: "",
            questionExampleOutput: "",
            questionExplaination: "",
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

    questionInputDescriptionChange = (event) => {
        this.setState({ questionInputDescription: event.target.value });
    }

    questionOutputDescriptionChange = (event) => {
        this.setState({ questionOutputDescription: event.target.value });
    }

    questionConstraintsDescriptionChange = (event) => {
        this.setState({ questionConstraintsDescription: event.target.value });
    }

    questionTasksChange = (event) => {
        this.setState({ questionTasks: event.target.value });
    }

    questionExampleInputChange = (event) => {
        this.setState({ questionExampleInput: event.target.value });
    }

    questionExampleOutputChange = (event) => {
        this.setState({ questionExampleOutput: event.target.value });
    }

    questionExplainationChange = (event) => {
        this.setState({ questionExplaination: event.target.value });
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
        const response = await backend.post('/newQuestion', { code: this.state.questionCode, title: this.state.questionTitle, content: this.state.questionBody, input: this.state.questionInputDescription, output: this.state.questionOutputDescription, constraints: this.state.questionConstraintsDescription, tasks: this.state.questionTasks, exampleInput: this.state.questionExampleInput, exampleOutput: this.state.questionExampleOutput, explaination: this.state.questionExplaination, testCaseInput: this.state.questionTestcaseInput, testCaseOutput: this.state.questionTestcaseOutput });
        if (response.data == "Upload Success") {
            this.setState({ submitStatus: response.data });
            history.push('/compiler');
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
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Code : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionCode} onChange={this.questionCodeChange}></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Title : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionTitle} onChange={this.questionTitleChange}></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Body : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionBody} onChange={this.questionBodyChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Input Description : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionInputDescription} onChange={this.questionInputDescriptionChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Output Description : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionOutputDescription} onChange={this.questionOutputDescriptionChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Constraint Description : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionConstraintsDescription} onChange={this.questionConstraintsDescriptionChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Tasks Description : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionTasks} onChange={this.questionTasksChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Example Input : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionExampleInput} onChange={this.questionExampleInputChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Example Output : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionExampleOutput} onChange={this.questionExampleOutputChange} ></FormControl>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Question Example Explaination : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" rows="5" className="border border-dark" style={{ marginRight: "10px" }} value={this.state.questionExplaination} onChange={this.questionExplainationChange} ></FormControl>
                            </InputGroup>
                            {/* <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>TestCases : </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="file" ></FormControl>
                            </InputGroup> */}
                            <InputGroup size="sm" className="mb-3">
                                <Form>
                                    <Form.File id="custom-file" label="Input test case" accept=".txt" onChange={this.onTestCaseChangeInput} custom></Form.File>
                                </Form>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <Form>
                                    <Form.File id="custom-file" label="Output test case" accept=".txt" onChange={this.onTestCaseChangeOutput} custom></Form.File>
                                </Form>
                            </InputGroup>
                            <Card.Body id="submitStatus" className="border border-dark" style={{ color: "blue" }}>{this.state.submitStatus} </Card.Body>
                        </Card.Body>
                        <Button variant="primary" onClick={this.submitQuestion}>Submit Question</Button>
                    </Card>
                </Container>
            </div >
        )
    }
}

export default AddQuestion;