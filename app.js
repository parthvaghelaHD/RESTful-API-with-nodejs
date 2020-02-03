const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
// require('dotenv').config()

const userRoutes = require('./api/routes/users');
const friendRoutes = require('./api/routes/friends');

const mongodb = 'mongodb://localhost:27017/Userdatabase';

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
},
  (err, res) => {
    if (!err) {
      console.log("you are connected");
    }
  });

//middle wares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());


// routes which should handle Request
app.use(userRoutes);
app.use(friendRoutes);

module.exports = app;