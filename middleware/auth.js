const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');

const isAuth = async (req, res, next) => {
  try {
    //    import token
    // headers=> authorization
    const token = req.headers.authorization;
    // console.log(token);
    //   no token
    if (!token) {
      return res.status(401).send({ errors: [{ msg: 'you are not authorized' }] });
    }
    // you are not authorized
    // on doit verifie si token est valide
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // test if the user exist with that id
    const user = await User.findOne({ _id: decoded.id }).select('-password');

    // you are not authorized
    if (!user) {
      return res.status(401).send({ errors: [{ msg: 'you are not authorized2' }] });
      // }
    }

    // si non
    // req to add user
    req.user = user;

    // next
    next();
  } catch (error) {
    res.status(401).send({ errors: [{ msg: 'you are not authorized' }] });
  }
};

module.exports = isAuth;
