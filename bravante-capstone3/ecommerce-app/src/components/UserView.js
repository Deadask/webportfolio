import { Button, Card, Row, Col, Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect,useState, useContext } from "react"
import UserContext from "../UserContext";
export default function UserView () {
    const [userEmail, setUserEmail] = useState();
    const [isAdmin, setIsAdmin] = useState()
    const {user} = useContext(UserContext);
    const token = localStorage.getItem(`token`)
    const {userId} = useParams();

    useEffect(()=>{
        
            fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/view`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)            
                setIsAdmin=data.isAdmin;
                setUserEmail=data.userEmail;
            }).catch(err=> console.log(err))
        
    },[userId]) 

    
    
    
    return (<>
        <Container>
            <Row>
                <Col className="col-12 col-md-4">
                    <Card >
                        <Card.Header>User Details</Card.Header>
                        <Card.Body>
                            <Card.Text>Email</Card.Text>
                            <Card.Subtitle>{userEmail}</Card.Subtitle>
                            <Card.Text>isAdmin</Card.Text>
                            <Card.Subtitle>{isAdmin}</Card.Subtitle>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success" className="rounded-pill p-5">go back</Button>
                        </Card.Footer>


                    </Card>
                </Col>
            </Row>
        </Container>


        
    
    </>)
}