const express = require('express');
const router = express.Router();
const userController = require("../Controllers/userController");
const auth = require("../auth");

// router.post("/checkEmail", (req, res) => {
//     userController.checkEmail(req.body).then(
//             resultFromController => res.send(
//             resultFromController
//         )
//     );
// })

router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(
            resultFromController => res.send(
            resultFromController
        )
    );
});

router.post("/login", (req, res) =>{
    userController.loginUser(req.body).then(
        resultFromController => res.send(
        resultFromController
        )
    );
});

// set user as admin
router.patch('/:userId/admin', auth.verify, (req, res) => {
    let data = {
        user : req.body,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

    userController.setAdmin(data, req.params).then(
        resultFromController => res.send(
        resultFromController
        )
    );
})

// retrieve user details.
router.get('/:userId/view', (req,res)=> {
    userController.viewUser(req.params).then(
        resultFromController => res.send(
        resultFromController
        )
    );
})

router.get("/details", auth.verify, (req, res) => {

    // Uses the "decode" method defined in the "auth.js" file to retrieve the user information from the token passing the "token" from the request header as an argument
    const data = {
       userId: auth.decode(req.headers.authorization).id
    }

    // Provides the user's ID for the getProfile controller method
    userController.getProfile(data).then(resultFromController => res.send(resultFromController));
});








module.exports = router;