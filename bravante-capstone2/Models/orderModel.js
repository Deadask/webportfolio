const mongoose = require('mongoose');

const OrderModel = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id is required"]
    },

    products:[ 
        {
        
            productId: {
                type: String,
                required: [true, "Product Id is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                default: 0
            },
            subtotal: {
                type: Number,
                default: 0
            }
        }
        
    ],

    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"],
        default: 0
    },

    purchasedOn: {
        type: Date,
        default: new Date()
    }
    

})

module.exports = mongoose.model('Order', OrderModel);
