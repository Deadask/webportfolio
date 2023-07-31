import { Button, Row, Col, Card } from 'react-bootstrap';
import sample from "../images/sample.png";
import {Link}  from 'react-router-dom'

export default function CourseCard({product}) {

const {name, description, price, _id, quantity, date} = product;


return (
    
        <Col className="col-xs-12 col-4 mt-2 p-1 ">
            <Card className="cardHighlight p-0">
                <Card.Body>
                    <Card.Img variant="top" src={sample} />
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Description</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Price</Card.Subtitle>
                    <Card.Text>{price}</Card.Text>
                    <Card.Subtitle>Quantity</Card.Subtitle>
                    <Card.Text>{quantity}</Card.Text>
                    <Card.Subtitle>Created on:</Card.Subtitle>
                    <Card.Text>{date}</Card.Text>
                    <Button className="bg-primary" as={Link} to={`/product/${_id}`}>Details</Button>
                </Card.Body>
            </Card>
        </Col>
        
    )
}