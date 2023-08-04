const express =  require('express');
const router = express.Router();

const productController = require('../Controllers/productController');
const auth = require('../auth');

// add/create new product
router.post("/create", auth.verify, (req, res)=> {
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    productController.addProduct(data).then(
        resultFromController => res.send(resultFromController)
    );
});


router.get('/all',auth.verify, (req, res) =>{
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    productController.getAllProducts(data).then(
        resultFromController => res.send(resultFromController)
    );
}) 

// get active items(admin only)
router.get("/active",auth.verify, (req,res) => {
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

	productController.getActiveProducts(data).then(resultFromController => res.send(resultFromController));
});

// retrieve single product
router.get('/:productId', (req, res) => {
    productController.getSingleProduct(req.params).then(resultFromController => res.send(resultFromController));
})

// update product details (admin only)
router.put('/:productId', auth.verify, (req, res) =>{
    const data = {
        product : req.body,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

    productController.updateProduct(data,req.params, req.body).then(resultFromController => res.send(resultFromController));
})

// archive product
router.patch('/archives/:productId', auth.verify, (req, res) =>{
    const data = {
        product : req.body,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

    productController.archiveProduct(data, req.params, req.body).then(resultFromController => res.send(resultFromController));
})
















module.exports = router;