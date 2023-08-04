const userModel = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const auth = require('../auth');


module.exports.registerUser = async (reqBody) => {
    const result_1 = await UserModel.find({ email: reqBody.email });
    if (result_1.length > 0) {
        return false;
    } else {
        let newUser = new UserModel({

            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 10),
            mobile: reqBody.lastName

        });

        return newUser.save().then((user, err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }  
}

module.exports.loginUser = (reqBody) => {
    return UserModel.findOne({ email: reqBody.email}).then(
        result  => {
            if (result == null) {
                return false;
            } else {
                const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

                if (isPasswordCorrect) {
                    return {
                        access: auth.createAccessToken(result)
                    }
                } else {
                    return false;
                };
            };
        }
    );
};

module.exports.setAdmin = (data, reqParams) => {
    if (data.isAdmin) {
        let updateUser = {
            isAdmin: data.user.isAdmin
        }

        return UserModel.findByIdAndUpdate(reqParams.userId, updateUser).then(
            (product, err) => {
                if (err) {
                    return false;
                } else {
                    return true;
                }

            }
        )
    
    }

    let message = Promise.resolve("Please use admin account to access")

    return message.then((value) => {
        return {value}
    });   
}

module.exports.viewUser = async (reqParams) => {
    return await UserModel.findById(reqParams.userId).then(user => {
        let userDetails = {
            email: user.email,
            isAdmin: user.isAdmin
        }
        return userDetails;
    })

}

module.exports.getProfile = (data) => {
return UserModel.findById(data.userId).then(result => {
    // Changes the value of the user's password to an empty string when returned to the frontend
    // Not doing so will expose the user's password which will also not be needed in other parts of our application
    // Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
    result.password = "";
    // Returns the user information with the password as an empty string
    return result;
    });
};

module.exports.getAllUsers =(data)=> {

    return (
        UserModel.find().then(res => {
            res.password = "";
            return res
        })

    )

}