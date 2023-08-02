import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Landing(){
    
    
    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-12 col-lg-4 mt-3' >
                        <Card className='cardHighlight p-0'>
                            <Card.Title>View Products</Card.Title>
                            <Card.Text>Veiw All Active Products</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-primary rounded-pill px-5' as={Link} to={'/products/all'}>Veiw</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col className='col-12 col-lg-4 mt-3'>
                        <Card className='cardHighlight p-0'>
                            <Card.Title>Add Product</Card.Title>
                            <Card.Text>Add Products</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-primary rounded-pill px-5' as={Link} to={'/products/add'}>Add</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col className='col-12 col-lg-4 mt-3'>
                        <Card className='cardHighlight p-0'>
                            <Card.Title>Set Admin</Card.Title>
                            <Card.Text>Set a user to admin</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-primary rounded-pill  px-5' as={Link} to={'/error'}>Veiw</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                                    
                </Row>
            </Container>

        </>
    )
}