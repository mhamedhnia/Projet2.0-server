/* eslint-disable no-console */
// import express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const connectDB = require('./config/dbConnect');
// instance app
const app = express();
app.use(express.json());
// documentation dotenv

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Connect DataBase
connectDB();

// Router
app.get('/', (req, res) => {
  res.send('Home Page Hello yaaaasmine');
});
// User
app.use('/api/user', require('./router/user'));
// Contact
app.use('/api/contact', require('./router/contact'));
// Product
app.use('/api/product', require('./router/product'));
// Port
const { PORT } = process.env;

// create server
app.listen(PORT, err => (err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)));
