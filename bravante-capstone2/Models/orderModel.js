const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id is required"]
    },

    products:[ 
        {
        
            productId: {
                type: String,
                required: [true, "Product Id is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"]
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"]
    },

    purchasedOn: {
        type: Date,
        default: new Date()
    }
    

})

module.exports = mongoose.model('Order', orderModel);
