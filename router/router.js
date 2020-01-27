const express = require('express');
const User = require('../models/userModel')
const router = express.Router()
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');

// get all Users
router.get('/getUser', async (req, res) => {
  console.log('hey')
  try {
    const users = await User.find({})
    res.status(500).send(users)
  } catch (e) {
    res.send(e)
  }

});

// Find user by name
router.get('/getUser/:name', async (req, res) => {
  const name = req.params.name;
  console.log(name)
  try {
    const users = await User.findOne({ 'name': name })
    if (!users) {
      return res.status(404).send();
    }
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
});

// vadharanu
router.post('/addfriendUser/:name', async (req, res) => {
  console.log(req.body)
  const asfriend = req.params.name;
  console.log(asfriend)
  const createUser = new User(req.body);
  try {
    await createUser.save()
    await User.findOneAndUpdate({
      email: req.body.email
    }, {
      frdId: createUser._id
    }, {
      new: true
    });
    console.log("TCL: createUser", createUser)
    res.send(createUser)
  } catch (e) {
    res.status(400).send(e)
  }
console.log("req.body", req.body)

});

// create an user
router.post('/addUser', async (req, res) => {
  console.log(req.body)
  const password = req.body.password;
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw err
        } else {
          console.log(hash)
          console.log(hash)
          //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K

          req.body.password = hash;
          const createUser = new User(req.body);
          try {
            createUser.save()
            res.send(createUser)
          } catch (e) {
            res.status(400).send(e)
          }

        }
      })
    }
  })
  console.log("req.body", req.body)

});

//edit an user
router.patch('/editUser/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOneAndUpdate({ 'name': req.params.name }, req.body, { new: true, runValidators: true })
    if (!user) {
      res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.send(e)
  }
})

//delete an user
router.delete('/deleteUser/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOneAndRemove({ 'name': name }, req.body)
    if (!user) {
      res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.send(e)
  }
})
module.exports = router