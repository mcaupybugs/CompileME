import React from 'react';
import Editor from '../components/Editor';
import CustomNavbar from '../components/CustomNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import Question from '../components/Question';


class ProblemPage extends React.Component {

    constructor() {
        super();
        this.state = { id: "" };
    }
    componentDidMount() {
        console.log(window.location.pathname);
        var path = window.location.pathname;
        var res = path.split('/');
        this.setState({ id: res[2] });
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <Container fluid="true">    {/* this is a container to devide the compiler to left and question to right */}
                    <Row>
                        <Col><Question /></Col>
                        <Col><Editor questionCode={this.state.id} /></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default ProblemPage;