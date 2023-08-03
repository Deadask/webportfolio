import {useState, useEffect} from 'react'
import AppNavbar from './components/AppNavbar';

import Home from './pages/Home';

import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AdminHome from './components/AdminHome';
import Product from './pages/Product';
import AddProduct from './components/AddProduct';
import Error from './pages/Error';
import ProductView from './components/ProductView';
import ViewCart from './pages/ViewCart';

import './App.css';

import {Container} from 'react-bootstrap';

import {UserProvider} from './UserContext'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  const [user,setUser] = useState({
    id: null,
    isAdmin: null
    });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json)
    .then(data => {
      //user is logged in
      if (typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
        // user is logged out
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      };

    });
  }, [])

  return (
    <Container fluid className='m-0 p-0'>
     <UserProvider value = {{user,setUser,unsetUser}}>
       <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/all" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/*" element={<Error />} />
            <Route path="/cart/view" element={<ViewCart />} />
          </Routes>
        </Container>
      </Router>
     </UserProvider>
      
    </Container>
  );
}

export default App;
