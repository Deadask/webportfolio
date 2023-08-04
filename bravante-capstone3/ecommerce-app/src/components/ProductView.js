import {useState, useContext, useEffect} from 'react'
import { Container, Card, Button, Row, Col, Modal, Form, InputGroup  } from 'react-bootstrap';
import {useParams, useNavigate, Link}  from 'react-router-dom'
import UserContext from '../UserContext'
import Swal from 'sweetalert2';
import sample from '../images/sample.png'

export default function ProductView () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [date, setDate] = useState();
    const [isActive, setIsActive] = useState(true)
    const {productId} = useParams();
    const {user} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const token = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setShow2(false)
        setShow3(false)
        };
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () =>{
        setShow2(true)
        setShow(false)
        setShow3(false)
        };
    const handleClose3 = () => {
        setShow3(false)
        setOrderQuantity(0)
        
    }; 
    const handleShow3 = () =>{
        setShow2(false)
        setShow(false)
        setShow3(true)
        };
    
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
            if(data.isActive) {
                localStorage.setItem('status', "Active")
                localStorage.setItem('status!', "Archive")
            } else {
                localStorage.setItem('status', "Archived")
                localStorage.setItem('status!', "Activate")
            }
        });
    }, [productId]);
    let status = localStorage.getItem('status');
    let status1 = localStorage.getItem('status!');
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
                    text: "Product Updated!"
                })

                navigate('/products/all')
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please, try again."
                })
            }
        })
    }

    let archiveProduct = (e)=> {
        e.preventDefault();

       fetch(`${process.env.REACT_APP_API_URL}/products/archives/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                isActive: isActive
            })        
        })
        .then(res =>  res.json())
        .then(data => {
            console.log(`update product ${data}`)
            if (data) {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product Updated!"
                })

                navigate('/products/all')
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please, try again."
                })
            }
        })
    }

    let addCart=(e)=>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/cart/add/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({
                quantity: orderQuantity
            }) 
        })
        .then(res =>  res.json())
        .then(data => {
            console.log(`update product ${data}`)
            if (data) {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product Updated!"
                })
                

                navigate('/cart/view')
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please, try again."
                })
            }
        })
        
    }
    let count = 0
    let increment=()=>{

        setOrderQuantity(orderQuantity+1)
        console.log(`orderQuantity `+orderQuantity)

        return orderQuantity
    }

    let decrement=()=>{
        if(orderQuantity>0){
        setOrderQuantity((prevValue)=>prevValue-1)
        console.log(orderQuantity)
        
        return orderQuantity
        } else {
            setOrderQuantity(0)
            
        }
        
    }


    return(
        <Container >
            {(user.isAdmin)?
                <>
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
                                        <Button variant="success" type="submit" id="submitBtn">
                        Update</Button>                        
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>                                
                    </Modal.Footer>
                    </Modal>

                    <Modal
                        show={show2}
                        onHide={handleClose2}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Archive</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card>
                                <Card.Header>Update Fields to be changed</Card.Header>
                                <Card.Body>
                                <Form onSubmit={(e)=> archiveProduct(e)} >
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Select onChange={(e)=>{setIsActive(e.target.value)}}>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                                
                                            </Form.Select>
                                        </Form.Group>               
                                        <Button variant="success" type="submit" id="submitBtn">
                        Update</Button>                        
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>                                
                    </Modal.Footer>
                    </Modal>
                </>
            :
            <Modal
            show={show3}
            onHide={handleClose3}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Header>{name}</Card.Header>
                        <Card.Body>
                            <Form onSubmit={(e)=> addCart(e)} >
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Text>{description}</Form.Text>
                                    
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="name">
                                    
                                    <Form.Text>Price</Form.Text>
                                    <Form.Text><h3>P {price}</h3></Form.Text>
                                </Form.Group>
                                <Row className="justify-content-center text-center">
                                    <Col className='col-6'>
                                        <InputGroup >                   
                                            <Button disabled={(orderQuantity===0)}className='bg-success buttonWidth' onClick={decrement}>-</Button>
                                            
                                            <Form.Control
                                                value= {orderQuantity}
                                                className='text-center'
                                                disabled
                                            />

                                            <Button className='bg-success buttonWidth' onClick={increment}>+</Button>           
                                        </InputGroup>
                                    </Col> 
                                    
                                </Row>
                                <Row className='mt-4'>         
                                <Button variant="success" type="submit" id="submitBtn">Add to Cart</Button>
                                </Row>                   
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                        Close
                    </Button>                                
                </Modal.Footer>
            </Modal>
            }
        
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
                                <Card.Text>{status}</Card.Text>
                                
                                    <Container className='text-center'>
                                        <Card.Footer className='text-center'>
                                            <Row className='justify-content-center'>
                                            {(user.isAdmin)?    
                                                <>
                                                
                                                    <Col className='col-4'>
                                                    <Button className="bg-primary rounded-pill px-4" onClick={handleShow}>
                                                Update</Button> 
                                                    </Col>
                                                    <Col className='col-4'>
                                                    <Button className="bg-primary rounded-pill px-4"  onClick={handleShow2}>
                                                {status1}</Button> 
                                                    </Col>

                                                    <Col className='col-4'>
                                                    <Button className="bg-primary rounded-pill px-4" as={Link} to={"/products/all"} >Back</Button>
                                                    </Col>
                                                
                                                </>
                                            :
                                                <>
                                                    <Col>
                                                    <Button className="bg-primary rounded-pill px-5" onClick={handleShow3} >Details</Button>
                                                    </Col>

                                                    <Col>
                                                    <Button className="bg-primary rounded-pill px-5" as={Link} to={"/products/all"} >Back</Button>
                                                    </Col>
                                                </>
                                            }
                                            </Row>
                                        </Card.Footer>                      
                                    </Container>
                                
                                    
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            
        </Container>
    )
}