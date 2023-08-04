import { Button, Row, Col, Card } from 'react-bootstrap';
import UserCard from "../components/UserCard";
import {useEffect, useState, useContext } from 'react';
import UserContext from "../UserContext";
import Error from "./Error"

export default function Users () {
    const [users, setUsers] = useState([]);
    const {user} = useContext(UserContext);
    const token = localStorage.getItem(`token`)

    useEffect(()=>{
        if (user.isAdmin){
            fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data =>{                         
                setUsers(data.map(account =>{
                    return (                    
                        <UserCard key={account.id} account = {account} />
                    )
                }))

            })
        }
    })
        
    
    return (
        <> 
            <Row className="mt-3 mb-3">            
                {users}            
            </Row>
        
        
            
        </>

    )
}