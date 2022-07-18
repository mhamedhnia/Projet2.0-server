// la fonction connect db
const mongoose = require('mongoose');

const connectDB = () =>
  mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
module.exports = connectDB;
