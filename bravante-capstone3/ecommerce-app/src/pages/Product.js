
import { Button, Row, Col, Card } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import {useEffect, useState, useContext } from 'react';
import UserContext from "../UserContext";
import Error from "./Error"

export default function Product () {
    const [products, setProducts] = useState([]);
    const {user} = useContext(UserContext);
    const token = localStorage.getItem(`token`)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data =>{            
            setProducts(data.map(product =>{
                return (                    
                    <ProductCard key={product.id} product = {product} />
                )
            }))

        })
    })
    
    return (
        <>{(user.isAdmin) ? 
            <Row className="mt-3 mb-3">            
                {products}            
            </Row>
        :
            <Error/>
        }
        
            
        </>

    )
}