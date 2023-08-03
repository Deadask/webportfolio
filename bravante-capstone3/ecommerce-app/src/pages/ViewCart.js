
import { useEffect, useState, useContext } from "react";
import {Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';

import { Container, Row, Col, Card, Button} from 'react-bootstrap'



export default function ViewCart  ()  {   
         
        const [rows, setRows] = useState([]);
        const [total, setTotal] = useState()
        useEffect(()=>{
            (fetch(`${process.env.REACT_APP_API_URL}/cart/view`, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
            .then(cart => {
                setTotal(cart.total)
                setRows(cart.cart.map((row, index) => { 
                    return (
                        <Row id='productRow' key={index}>
                            <Col className='colBorder-secondary m-0'>{row.name}</Col>
                            <Col className='colBorder-secondary m-0'>{row.quantity}</Col>
                            <Col className='colBorder-secondary m-0'>{row.price}</Col>
                            <Col className='colBorder-secondary m-0'>{row.subTotal}</Col>
                        </Row>
                    );
                }));
            })
            )
        },[])
        
    return (
        
                <Row className='text-center'>
                    <Col className='mx-0 '></Col>
                    <Col className='border-light mx-0'>
                        <Card bg="light"style={{width: '40rem'}}>
                            <Card.Header>Sample Cart</Card.Header>
                            <Card.Body style={{height: '20rem'}}>
                                <Row id='labelRow'style={{height: '2rem', }} >
                                    <Col className='colBorder-secondary colBg-secondary m-0'><h5>Item</h5></Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'><h5>Quantity</h5></Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'><h5>Price</h5></Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'><h5>Subtotal</h5></Col>
                                </Row>
                                {rows}
                                <Row id='totalRow' style={{height: '2rem', }}>
                                    <Col className='colBorder-secondary colBg-secondary m-0'></Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'></Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'>Total</Col>
                                    <Col className='colBorder-secondary colBg-secondary m-0'>{total}</Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button className='rounded-pill p-3'>Check Out</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className='mx-0 '></Col>
                    
                </Row>
            
        )
}