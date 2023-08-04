const mongoose = require ('mongoose');

const CartModel = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'user id is required']
	},
	
	cart: [{
		productId: {
			type: String,
			required: [true	, 'productId is required']
		},

		name: {
			type: String,
			required: [true, 'name is required']
		},

		price: {
			type: Number,
			required: [true, 'price is required']
		},

		quantity: {
			type: Number,
			required: [true, 'quantity is required']
		},

		subTotal: {
			type: Number,
			default: 0
		}

	}],

	total: {
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model('Cart', CartModel);