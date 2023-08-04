import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Landing(){
    
    
    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-12 col-lg-3 mt-3' >
                        <Card className='cardHeight p-0'style={{height: '10rem'}}>
                            <Card.Title>View Products</Card.Title>
                            <Card.Text>Veiw All Active Products</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-primary rounded-pill px-5' as={Link} to={'/products/all'}>Veiw</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col className='col-12 col-lg-3 mt-3'>
                        <Card className='cardHeight p-0'style={{height: '10rem'}}>
                            <Card.Title>Add Product</Card.Title>
                            <Card.Text>Add Products</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-primary rounded-pill px-5' as={Link} to={'/products/add'}>Add</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* <Col className='col-12 col-lg-3 mt-3'>
                        <Card className='cardHeight p-0'style={{height: '10rem'}}>
                            <Card.Title>Set Admin</Card.Title>
                            <Card.Text>Set a user to admin</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-secondary rounded-pill  px-5' as={Link} to={'/users/all'} disabled >Veiw</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col className='col-12 col-lg-3 mt-3'>
                        <Card className='cardHeight p-0'style={{height: '10rem'}}>
                            <Card.Title>View Orders</Card.Title>
                            <Card.Text>veiw all orders</Card.Text>
                            <Card.Footer className='mt-auto text-center'>
                                <Button className='bg-secondary rounded-pill  px-5' as={Link} to={'/error'} disabled >Veiw</Button>
                            </Card.Footer>
                        </Card>
                    </Col> */}
                                    
                </Row>
            </Container>

        </>
    )
}