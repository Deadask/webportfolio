import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Landing(){
    
    
    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-4'>
                        <Card className='cardHighlight p-0'>
                            <Card.Title>View Products</Card.Title>
                            <Card.Text>Veiw All Active Products</Card.Text>
                            <Button className='bg-primary my-auto' as={Link} to={'/products'}>Veiw</Button>
                        </Card>
                    </Col>

                    <Col className='col-4'>
                        <Card className='cardHighlight p-0'>
                            <Card.Title>Add Product</Card.Title>
                            <Card.Text>Add Products</Card.Text>
                            <Button className='bg-primary my-auto' as={Link} to={'/products/add'}>Add</Button>
                        </Card>
                    </Col>

                    <Col className='col-4'>
                        <Card className='cardHighlight p-0'>
                            <Card.Title>Set Admin</Card.Title>
                            <Card.Text>Set a user to admin</Card.Text>
                            <Button className='bg-primary my-auto' as={Link} to={'/error'}>Veiw</Button>
                        </Card>
                    </Col>
                                    
                </Row>
            </Container>

        </>
    )
}