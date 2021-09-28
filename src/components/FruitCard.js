import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class FruitCard extends React.Component {
    
    render() {
        return (
            <div>
                    <Card show={this.props.show}>
                    <Card.Img variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {this.props.price}
                        </Card.Text>
                        <Button variant="primary"
                            onClick={() => { this.props.updateFruit(this.props.item) }}
                        >Update fruit</Button>
                        <Button variant="primary"
                            onClick={() => { this.props.deleteFruit(this.props._id) }}
                        >Delete fruit</Button>
                    </Card.Body>
                </Card>
                  
            </div>
        );
    }
}

export default FruitCard;