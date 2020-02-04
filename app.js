const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const querystring = require('querystring');
//Require Routes Files
const userRoutes = require("./api/routes/users");
const friendRoutes = require("./api/routes/friends");
//assign mongodb localhost path
const mongodb = "mongodb://localhost:27017/Userdatabase";
// Connection with mongodb
mongoose.connect(
  mongodb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err, res) => {
    if (!err) {
      console.log("you are connected");
    }
  }
);
//Middlewares
app.use(morgan("dev"));
// Body-parser Middelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes which should handle Request
app.use(userRoutes);
app.use(friendRoutes);

// Exports a whole app
module.exports = app;
