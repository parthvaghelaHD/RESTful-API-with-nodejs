const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const friendUser = require('./models/friend');
const bodyParser = require('body-parser');
const validator = require('validator')
const userRouter = require('./router/router')
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use('/', userRouter)
const mongodb = 'mongodb://localhost:27017/Userdatabase'

/*
1. Create user
2. Add another user as friend
3. Remove a user as friend from friend list
4. List all the friend for a specific user
5. Count of friends of specific friend in friend list
 */

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
},
  (err, res) => {
    if (!err) {
      console.log("We are connected");
    }
  });

// for listening on port
app.listen(port, (req, res) => {
  console.log(` Server starts on ${port}`)
})