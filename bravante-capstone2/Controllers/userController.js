const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
// const auth = require(`../auth`);


module.exports.registerUser = async (reqBody) => {
    const result_1 = await userModel.find({ email: reqBody.email });
    if (result_1.length > 0) {
        return false;
    } else {
        let newUser = new userModel({
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 10)
        });

        return newUser.save().then((user, err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }
    

    /*let newUser = new userModel({
       email: reqBody.email,
       password: bcrypt.hashSync(reqBody.password, 10)
    });

    return newUser.save().then((user, err)=>{
        if (err) {
            return false;
        } else {
            return true;
        }
    })*/
}