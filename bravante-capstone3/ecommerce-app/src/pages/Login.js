import React, { useState, useEffect,useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import Swal from 'sweetalert2'

import {Navigate} from 'react-router-dom';

import UserContext from "../UserContext";

export default function Login() {
 
 const {user, setUser} = useContext(UserContext)

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isActive, setIsActive] = useState(false);
 

 useEffect(() => {
  if (email !== "" && password !== "") {
   setIsActive(true);
  } else {
   setIsActive(false);
  }
 }, [email, password]);

 function LoginUser(e) {
  e.preventDefault();

  fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
  }).then(res => res.json())
  .then(data => {
    // we will receive a token or error
    console.log(data);

    if (typeof data.access !== "undefined") {
        localStorage.setItem('token', data.access)
        retrieveUserDetails(data.access);
        
        
          
        Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Online Shopping"
            })
        } else {
            
            Swal.fire({
                title: "Authentication Failed",
                icon: "error",
                text: "Please, check your login details and try again."
        });
    }
  })

  /*// 
      set email of the authenticated user in the local storage
      // [SYNTAX] localStorage.setItem(propertyName, value);

      localStorage.setItem('email', email)

      //sets the global user stat to have the properties obtained from the local storage 
      setUser({email: localStorage.getItem('email')});
  */
 
  setEmail("");
  setPassword(""); 

  // alert("You are now login!");
 }
 
 const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
          if (data.isAdmin === false) {
          fetch(`${process.env.REACT_APP_API_URL}/cart/view`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
          })
          .then(res => res.json())
          .then(data => {
            if(data){
            localStorage.setItem('cart', data.cart)
            }
          }).catch(err => console.log(err))
        }
        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        })
    })
 }


 return (

    (user.id) ?
    <Navigate to="/" />

    :
  <Container>
    <Row className='justify-content-center'> 
      <Col className="col-6">
        <Form onSubmit={e => LoginUser(e)}>
          <Form.Group controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            {isActive ?
            <Button variant="success" type="submit" id="submitBtn">
              Submit
            </Button>
            :
            <Button variant="danger" type="submit" id="submitBtn" disabled>
              Submit
            </Button>
            }
          </Form.Group>
        </Form>
      </Col>
    </Row>
    
  </Container>
 );
}