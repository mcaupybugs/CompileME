import React from 'react';
import { Card } from 'react-bootstrap';

class ContentCard extends React.Component {
    render() {
        return (<div>
            <Card className="rounded border border-dark">
                <Card.Header className="border border-dark">{this.props.header}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>)
    }
}

export default ContentCard;