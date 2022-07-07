const express = require("express");
const {
    Login,
    Register,
    UpdateUser,
} = require("../controllers/user_controllers");
const isAuth = require("../middleware/auth");
const {
    validation,
    loginValidate,
    registerValidate,
} = require("../middleware/validateUser");
const { updateMany } = require("../models/userSchema");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("testing router");
});

//Annotation

/*
@method: POST
@ path:http:localhost:5000/api/user/register
@ parameter: req.body  
public
*/
router.post("/register", registerValidate(), validation, Register);

/*
@method: POST 
@path:http:localhost:5000/api/user/login
@parameter:req.body{email pass}
public
*/
router.post("/login", loginValidate(), validation, Login);
/*
@method: GET 
@path:http:localhost:5000/api/user/current
@parameter:req.body{email pass}
prive
*/
router.get("/current", isAuth, (req, res) => {
    res.status(200).send({ msg: "authorized", user: req.user });
});
router.put("/:id", isAuth, UpdateUser);

module.exports = router;
