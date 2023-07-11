const OrderModel = require('../Models/OrderModel');

const ProductModel = require('../Models/ProductModel');


// controller for order creation
 module.exports.createOrder = async (data) => {
    //checks if user is admin or not
    if(data.isAdmin == false) {
        //checks if user has existing order
        let doesUserHaveOrder = await OrderModel.find({userId : data.userId}).then(result => {
            console.log(result.length)
            if (result.lenght >0) {
                return false
            } else {
                return true
            }
        })
        console.log(doesUserHaveOrder)
        if (doesUserHaveOrder){
            let subTotal = await ProductModel.findById(data.productId).then(result => {
                let subTotalAmount = result.price * data.quantity
                return subTotalAmount;
                });
            let newProductOrder = {
                productId: data.productId,
                quantity: data.quantity,
                subTotal: subTotal
            }
            let updateOrderProducts = await OrderModel.find({userId : data.userId}).then(result => {
                    // add req.body to products array
                    console.log(typeof result);
                    console.log(result);
                    console.log(typeof result.products);
                    console.log(result.products);
                    // check if other component of result is undefined
                    console.log(typeof result.userId)
                    console.log(result.userId);
                    result.products.push(newProductOrder);
                        
                    

                    // adjust total amount accounting the added order
                    result.totalAmount = subTotal + result.totalAmount;

                    // updates timestamp of order modification
                    result.purchasedOn = new Date()
                return result.save().then((order, err) =>{
                    if(err){
                        return false;
                    } else {
                        console.log("created from doesUserHaveOrder: true")
                        return true;
                    }
                })
                }
            )
            if(doesUserHaveOrder){
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