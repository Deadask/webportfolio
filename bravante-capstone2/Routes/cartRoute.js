const express = require ("express");
const router = express.Router();
const cartController = require ("../Controllers/cartController")
const auth = require ("../auth.js")

// veiw cart

router.get("/view", auth.verify, (req, res) =>{
	let data = {
		userId: auth.decode(req.headers.authorization).id,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	cartController.veiwCart(data).then(resultFromController => res.send(resultFromController))
})

router.post("/add/:productId", auth.verify, (req,res) =>{
	let data = {
		userId : auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
		quantity: req.body.quantity,
		productId: req.params.productId
		}

	cartController.addCart(data, req.params,).then(resultFromController => res.send(resultFromController))
})

module.exports = router;