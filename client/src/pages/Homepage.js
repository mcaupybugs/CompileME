import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import { Container, Col, Row } from 'react-bootstrap';
import QuestionLink from '../components/QuestionLink';
import { ListGroup, Card } from 'react-bootstrap';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <Container style={{ marginRight: "20px", marginLeft: "20px" }} fluid="true">
                    <Row>
                        <Col></Col>
                        <Col xs={7}>
                            <Card className="text-center">
                                <Card.Header>
                                    Questions
                                </Card.Header>
                            </Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <QuestionLink />
                                </ListGroup>
                            </Card.Body>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Homepage;