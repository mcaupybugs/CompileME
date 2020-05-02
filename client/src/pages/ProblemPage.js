import React from 'react';
import Editor from '../components/Editor';
import CustomNavbar from '../components/CustomNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import Question from '../components/Question';


class ProblemPage extends React.Component {

    render() {
        return (
            <div>
                <CustomNavbar />
                <Container fluid="true">    {/* this is a container to devide the compiler to left and question to right */}
                    <Row>
                        <Col><Question /></Col>
                        <Col><Editor /></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default ProblemPage;