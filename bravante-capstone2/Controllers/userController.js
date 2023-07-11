const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const auth = require('../auth');


module.exports.registerUser = async (reqBody) => {
    const result_1 = await UserModel.find({ email: reqBody.email });
    if (result_1.length > 0) {
        return false;
    } else {
        let newUser = new UserModel({
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

module.exports.viewUser = (reqParams) => {
    return UserModel.findById(reqParams.userId).then(user => {
        return user;

    })

}