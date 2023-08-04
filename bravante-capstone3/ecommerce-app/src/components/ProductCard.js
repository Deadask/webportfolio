import { Button, Row, Col, Card } from 'react-bootstrap';
import sample from "../images/sample.png";
import {Link}  from 'react-router-dom'

import Error from '../pages/Error';

export default function CourseCard({product}) {


const {name, description, price, _id, quantity, date} = product;


return (
    <>
    
        <Col className="col-12 col-md-4 mt-2 p-1 ">
            <Card className="p-0" >
                <Card.Body>
                    <Card.Img classvariant="top" src={sample} />
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Description</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Price</Card.Subtitle>
                    <Card.Text>{price}</Card.Text>
                    <Card.Subtitle>Quantity</Card.Subtitle>
                    <Card.Text>{quantity}</Card.Text>
                    <Card.Subtitle>Created on:</Card.Subtitle>
                    <Card.Text>{date}</Card.Text>
                    <Card.Footer className='text-center'>
                        <Button className="bg-primary rounded-pill px-5" as={Link} to={`/products/${_id}`}>Details</Button>
                    </Card.Footer>
                    
                   
                </Card.Body>
            </Card>
        </Col>
    
    
    </>
        
    )
}