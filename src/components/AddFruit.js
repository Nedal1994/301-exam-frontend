import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class AddFruit extends React.Component {
    render() {
        return (
            <div>
                {this.props.fruitsArr.map((item) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                {item.price}
                                </Card.Text>
                                <Button variant="primary"
                                onClick={()=>{this.props.addFruit(item)}}
                                >Add fruit</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default AddFruit;