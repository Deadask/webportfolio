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

router.get("/active",auth.verify, (req,res) => {
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

	productController.getActiveProducts(data).then(resultFromController => res.send(resultFromController));
});

module.exports = router;