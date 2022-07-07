const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
exports.Register = async (req, res) => {
    try {
        // req.body= name , email , password , phone
        const { name, email, password, phoneNumber } = req.body;
        // test email
        const findUser = await User.findOne({ email });
        // email should be unique
        if (findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "email should be unique" }] });
        }
        // new user
        const newUser = await new User({ ...req.body });

        // hashage password
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedpassword;
        //then we save user in DB
        await newUser.save();

        // CRRE UN TOKEN
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "3h" }
        );
        // response
        res.status(200).send({ msg: "register succ", user: newUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "user not saved" }] });
    }
};

exports.Login = async (req, res) => {
    console.log(req);
    try {
        //Saisie de l'email et le password
        const { email, password } = req.body;
        //Test if email exist
        let findUser = await User.findOne({ email });

        //If user doesn't exist
        if (!findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential1" }] });
        }
        //Compare password with the password saisie in DB
        const comparePass = await bcrypt.compare(password, findUser.password);
        //If pass!=findUser.pass
        if (!comparePass) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential" }] });
        }
        // CREE UN TOKEN
        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "3h" }
        );
        res.status(200).send({
            msg: "login successfully",
            user: findUser,
            token,
        });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not login" }] });
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const r = await User.updateOne(
            { _id: req.params.id },
            { $set: { ...req.body } }
        );
        console.log(r);
        if (r.modifiedCount) {
            return res.send({ msg: "updated" });
        }
        res.send({ msg: "there is no modification" });
    } catch (error) {
        res.send({ msg: "can not modify it" });
    }
};
