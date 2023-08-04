const OrderModel = require('../Models/orderModel');
const CartModel = require('../Models/CartModel.js')

const ProductModel = require('../Models/productModel');


// controller for order creation
 module.exports.createOrder = async (data) => {
    if (data.isAdmin === false) {
        console.log('User Not Admin')
        //determine if creating a new db entry or push to existing
        let pathCheck = false;
        let checkUserData = await OrderModel.findOne({userId: data.userId}).then(res=>{
            console.log(`UserData:`)
            console.log(res)
            return res;
        })
        console.log("CheckUserData: ")
        console.log(checkUserData);

        if (checkUserData) {
            pathCheck = false;
        } else {
            pathCheck = true;
        }

        //if (pathCheck) {
            let cartOrder = await CartModel.findOne({userId: data.userId}).then(res=> {
                console.log ("cartData");
                console.log(res);
                return res
            })

            let newOrder = new OrderModel({
                    userId: data.userId,
                    products: cartOrder.cart,
                    total: cartOrder.total,
                })

                return newOrder.save().then((user,x)=>{
                    if (x) {
                        console.log (`add cart error: ${x}`);
                        return false 
                    } else {
                        console.log (newOrder)
                        return true
                    }
                });
            return true
        //} 
        /*else {
            // get product data
            let getProduct = await ProductModel.findById(data.productId).then(result=> result)
            // Check if the item already exists in the cart.
            let checkCart = await CartModel.findOne({userId:data.userId}).then(cart=>{

                return cart
            })
            console.log("checkCart");
            console.log(checkCart);
            
            const existingIndex = checkCart.cart.findIndex((product)=> product.productId === data.productId);
            console.log("existingIndex")
            console.log(existingIndex)

            // If the item exists, update the quantity.
            if (existingIndex !== -1) {
                checkCart.cart[existingIndex].quantity += data.quantity;
            } else {
                // If the item does not exist, add it to the cart.
                checkCart.cart.push({
                    productId: data.productId,
                    name: getProduct.name,
                    quantity: data.quantity,
                    price: getProduct.price
                });
            }

            // Calculate the subtotal and total for the cart.
            for (const cart of checkCart.cart) {
                cart.subTotal = cart.price * cart.quantity;
            }
            const total = checkCart.cart.reduce((acc, cart)=>{
                return acc + cart.subTotal;
            }, 0);          
            
            checkCart.total =  total
            console.log("updated checkCart")
            console.log(checkCart)

            return checkCart.save().then((updateCart,x)=>{
                if (x) {
                    return false
                } else {
                    console.log(`cart ${data.userId} updated`)
                    return true
                }

            })
        };*/
    };

    let message = Promise.resolve("User must be non-Admin to access this.")
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