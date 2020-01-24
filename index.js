const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


const mongodb = 'mongodb://localhost:27017/Userdatabase'
app.use(express.json());

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true}, (err, res)=>{
  if(!err) {
    console.log("We are connected");
  }
});

app.post('/addUser', async (req, res) => {
  console.log("req.body", req.body)
  const createUser = new User(req.body);
  try {
    await createUser.save();
    res.send(createUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, (req, res)=>{
  console.log(` Server starts on ${port}`)
})