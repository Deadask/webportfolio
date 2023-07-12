const OrderModel = require('../Models/OrderModel');

const ProductModel = require('../Models/ProductModel');


// controller for order creation
 module.exports.createOrder = async (data) => {
    //checks if user is admin or not
    if(data.isAdmin == false) {
        //checks if user has existing order
        let doesUserHaveOrder = await OrderModel.find({userId : data.userId}).then(result => {
            
            if (result.length >0) {
                return true
            } else {
                return false
            }
        })
        
        if (doesUserHaveOrder){
            let subTotal = await ProductModel.findById(data.productId).then(result => {
                let subTotalAmount = result.price * data.quantity
                return subTotalAmount;
                });
            let newProductOrder = {
                productId: data.productId,
                quantity: data.quantity,
                subtotal: subTotal
            }
            let updateOrderProducts = await OrderModel.findOne({userId : data.userId}).then(result => {
                result.products.push(newProductOrder);
                result.totalAmount = result.totalAmount+subTotal;
                result.purchasedOn = new Date();

                return result.save().then((order, err) =>{
                    if (err) {
                        return false;
                    } else {
                        return true
                    }
                })
            })

            if (updateOrderProducts && doesUserHaveOrder) {
                return true;
            } else {
                return false
            }
           

        } else {
            let subTotal = await ProductModel.findById(data.productId).then(result => {
                let subTotalAmount = result.price * data.quantity
                return subTotalAmount;
                });
                
    
                let newOrder = new OrderModel({
                    userId: data.userId,
                    products: {
                        productId:data.productId,
                        quantity:data.quantity,
                        subtotal: subTotal,
                    },
                    totalAmount: subTotal
                })
    
                return newOrder.save().then((order, err) =>{
                    if(err) {
                        return false;
                    } else {
                        console.log("created from doesUserHaveOrder: false")
                        return true;
                    }
                })
        }
            
    }

    let message = Promise.resolve("Please use non-admin accounts to access")

    return message.then((value) => {
        return {value}
    });   
 }

 module.exports.viewAllOrders = (data) => {
    if (data.isAdmin) {
        return OrderModel.find().then(order => {
            return order
        })
    }

    let message = Promise.resolve("Please use admin account to access")

    return message.then((value) => {
        return {value}
    });   
 }