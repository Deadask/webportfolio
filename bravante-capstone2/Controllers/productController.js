const productModel = require("../Models/productModel");

module.exports.addProduct = (data) => {
    if (data.isAdmin) {
        let newProduct = new ProductModel({
            name: data.product.name,
            description: data.product.description,
            quantity: data.product.quantity,
            price: data.product.price
        });

        return newProduct.save().then(
            (product,err) => {
                if (err) {
                    return false;
                } else {
                    return true;
                }
            });
    }

    let message = Promise.resolve("User must be admin to access this.")

    return message.then((value) => {
        return {value}
    });
};

module.exports.getAllProducts = (data) => {
    console.log(data.isAdmin);
    if (data.isAdmin) {
        return ProductModel.find({}).then(result => {
            return result;
        });
    }

    let message = Promise.resolve("User must be admin to access this.")

    return message.then((value) => {
        return {value}
    });
}

module.exports.getActiveProducts = (data) => {
    if (data.isAdmin == false) {
        return ProductModel.find({isActive: true}).then(result => {
            return result;
        });
    }
    

    let message = Promise.resolve("Please use non-admin accounts to access")

    return message.then((value) => {
        return {value}
    });   
}

module.exports.getSingleProduct = (reqParams) => {
    return ProductModel.findById(reqParams.productId).then(
        result => {
            return result;
        }
    )
}

module.exports.updateProduct = (data, reqParams, reqBody) => {
    if (data.isAdmin) {
        let updatedProduct = {
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price,
            quantity: reqBody.quantity
        };

        return ProductModel.findByIdAndUpdate(reqParams.productId, updatedProduct).then(
            (product, err) =>{
                if (err) {
                    return false;
                } else {
                    return true
                };
            }
        );
    };

    let message = Promise.resolve("Please use admin account to access")

    return message.then((value) => {
        return {value}
    });   
};

module.exports.archiveProduct = (data, reqParams, reqBody) => {
    if (data.isAdmin) {
        let updatedStatus = {
            isActive: reqBody.isActive
        }

        return ProductModel.findByIdAndUpdate(reqParams.productId, updatedStatus).then(
            (product, err) => {
                if (err) {
                    return false;
                } else {
                    return true;
                }

            }
        )
    };

    let message = Promise.resolve("Please use admin account to access")

    return message.then((value) => {
        return {value}
    });   
}