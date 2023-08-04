import {Col, Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';


export default function UserCard ({account}) {

    const {firstName, email, isAdmin, _id,} = account;


    return (
        <>
    
        <Col className="col-12 col-md-4 mt-2 p-1 ">
            <Card className="p-0" >
                <Card.Body>
                    <Card.Title>{firstName}</Card.Title>
                    <Card.Subtitle>Email</Card.Subtitle>
                    <Card.Text>{email}</Card.Text>
                    <Card.Subtitle>Admin Status</Card.Subtitle>
                    <Card.Text>{isAdmin}</Card.Text>
                    <Card.Footer className='text-center'>
                        <Button className="bg-primary rounded-pill px-5" as={Link} to={`/users/${_id}/view`}>Details</Button>
                    </Card.Footer>
                    
                   
                </Card.Body>
            </Card>
        </Col>
    
    
    </>
    )
}