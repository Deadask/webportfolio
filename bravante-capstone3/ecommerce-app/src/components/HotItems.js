import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import sample from "../images/sample.png";
import {Link}  from 'react-router-dom'

export default function HotItems(){
    return (
        <>
        <Container className='text-center viewHeight'>
            <Row className='justify-content-center'>
                <Col className = 'col-12 col-lg-4 my-3'>
                    <Card className=''>
                        <Card.Img className='imgSize'variant="top" src={sample} />
                        <Card.Header>
                            <h4>Sample Hot Item</h4>
                        </Card.Header>
                        <Card.Body>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lectus non neque aliquam cursus et in quam. Nam rutrum nisl ut finibus tristique. Vivamus quis nisi viverra, tempor metus id, convallis nisi. Praesent tortor mi, gravida eget congue vel, elementum non mauris.</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button className='rounded-pill px-5'>Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col className = 'col-12 col-lg-4 my-3'>
                    <Card className=''>
                        <Card.Img className='imgSize'variant="top" src={sample} />
                        <Card.Header>
                            <h4>Sample Hot Item</h4>
                        </Card.Header>
                        <Card.Body>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lectus non neque aliquam cursus et in quam. Nam rutrum nisl ut finibus tristique. Vivamus quis nisi viverra, tempor metus id, convallis nisi. Praesent tortor mi, gravida eget congue vel, elementum non mauris.</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button className='rounded-pill px-5'>Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col className = 'col-12 col-lg-4 my-3'>
                    <Card className=''>
                        <Card.Img className='imgSize'variant="top" src={sample} />
                        <Card.Header>
                            <h4>Sample Hot Item</h4>
                        </Card.Header>
                        <Card.Body>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lectus non neque aliquam cursus et in quam. Nam rutrum nisl ut finibus tristique. Vivamus quis nisi viverra, tempor metus id, convallis nisi. Praesent tortor mi, gravida eget congue vel, elementum non mauris.</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button className='rounded-pill px-5'>Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                
                
            </Row>
        </Container>
        </>
    )
}