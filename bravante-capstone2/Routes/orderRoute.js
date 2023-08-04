const express = require('express');
const router = express.Router();
const orderController =  require('../Controllers/orderController');
const auth = require('../auth');

// create a new order
router.patch('/create/', auth.verify, (req, res) => {
    let data = {
        userId: auth.decode(req.headers.authorization).id,        
        isAdmin: auth.decode(req.headers.authorization).isAdmin,        
    }

    orderController.createOrder(data).then(resultFromController => res.send(resultFromController))
})

router.get('/view', auth.verify, (req, res)=> {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    orderController.viewAllOrders(data).then(resultFromController => res.send(resultFromController));
})














module.exports = router;
