const ProductModel = require("../Models/productModel");

module.exports.addProduct = (data) => {
    if (data.isAdmin) {
        let newProduct = new ProductModel({
            name: data.product.name,
            description: data.product.description,
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