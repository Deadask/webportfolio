import {useState, useContext, useEffect} from 'react'
import { Container, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import {useParams, useNavigate}  from 'react-router-dom'
import UserContext from '../UserContext'
import Swal from 'sweetalert2';
import sample from '../images/sample.png'

export default function ProductView () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState();
    const [isActive, setIsActive] = useState(true)
    const {productId} = useParams();
    const {user} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data._id);
            setName(data.name);
            setDescription(data.description);
            setQuantity(data.quantity);
            setPrice(data.price);
            setDate(data.createdOn);
            setIsActive(data.isActive);
        });
    }, [productId]);
    
    let updateProduct =(e)=>{
       e.preventDefault();

       fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                quantity: quantity,
                price: price,
            })
            .then(res =>  res.json())
            .then(data => {
                console.log(`update product ${data}`)
                if (data) {
                    setName("");
                    setDescription("");
                    setPrice("");
                    setQuantity("");
    
                    Swal.fire({
                        title: "Success!",
                        icon: "success",
                        text: "Product Added!"
                    })
    
                    navigate('/products/add')
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Please, try again."
                    })
                }
            })

       })
    }


    return(
        <Container >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Update Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Header>Update Fields to be changed</Card.Header>
                        <Card.Body>
                        <Form onSubmit={(e)=> updateProduct(e)} >
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                    placeholder="Enter Product Name" 
                                    required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={description}
                                    onChange={(e) => {setDescription(e.target.value)}}
                                    placeholder="Enter Description" 
                                    required
                                    />                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => {setQuantity(e.target.value)}}
                                    placeholder="Set Quantity" 
                                    required
                                    />                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={price}
                                    onChange={(e) => {setPrice(e.target.value)}}
                                    placeholder="Set Price" 
                                    required
                                    />                                    
                                </Form.Group>                          
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" type="submit" id="submitBtn">
                Update</Button>                
            </Modal.Footer>
            </Modal>
        
                <Row className='justify-content-center'>
                    <Col className="col-xs-12 col-9 mt-2 p-1 ">
                        <Card style={{width: '500px'}}className="p-0">
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
                                <Card.Subtitle>Status:</Card.Subtitle>
                                <Card.Text>{isActive}</Card.Text>
                                {(user.isAdmin) ?
                                    <Container className='text-center'>
                                    <Row className='justify-content-around'>
                                        <Col>
                                        <Button variant="primary" onClick={handleShow}>
                                    Update</Button> 
                                        </Col>
                                        <Col>
                                        <Button variant="primary" onClick={handleShow}>
                                    Activate/Archive</Button> 
                                        </Col>
                                    </Row>
                                                                
                                    </Container>
                                :
                                    <Button className="bg-primary" disabled >Add to Cart</Button>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            
        </Container>
    )
}