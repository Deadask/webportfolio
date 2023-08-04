import {Form,Container,Row,Col,Button, Card} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import Error from '../pages/Error';
export default function AddProduct () {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [description,setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);
    const token =localStorage.getItem("token");
    useEffect(()=> {
        if (name !== "" && price !== "" && quantity !== "" && description !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    },[name,price,quantity,description])

    let AddProduct=(e)=>{
        console.log(typeof quantity, typeof price)
        setQuantity(Number(quantity));
        setPrice(Number(price));
        console.log(typeof quantity, typeof price)

        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
            method: "POST",
            headers :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify({
                name : name,
                description : description,
                quantity: quantity,
                price: price,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

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
    }
    
    


    const {user} = useContext(UserContext);

    return (
    <> {(user.isAdmin) ?
       <Container>
            <Row className='justify-content-center mt-5'>
                <Col className="col-6">
                    <Card>
                        <Card.Header>Add Product</Card.Header>
                        <Card.Body>
                            <Form onSubmit={(e)=> AddProduct(e)} >
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

                                { isActive ?
                                    <Button variant="success" type="submit" id="submitBtn">
                                    Submit
                                    </Button>
                                :
                                    <Button variant="success" type="submit" id="submitBtn" disabled>
                                    Submit
                                    </Button>
                                }

                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
       </Container>

        :
        <Error />
    }   
        
    </>
    
    )
}