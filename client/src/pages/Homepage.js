import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import { Container, Col, Row } from 'react-bootstrap';
import ContentCard from '../components/ContentCard';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { header: 'Featured', title: 'How are you !!', content: 'Elaborated content goes here' };
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <Container>
                    <Row>
                        <Col>Yo</Col>
                        <Col xs={8}><ContentCard header={this.state.header} title={this.state.title} content={this.state.content}></ContentCard></Col>
                        <Col>Yo</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Homepage;