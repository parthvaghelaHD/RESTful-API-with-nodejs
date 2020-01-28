const express = require('express');
const User = require('../models/userModel')
const friendUser = require('../models/friend');
const router = express.Router()
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
// const {userController} = require('../controller')

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

// addfriendUser
router.post('/addFriend/:id', async (req, res) => {
  const userId = req.body.userId;
  const friendId = req.params.id;
  const friendObject = {
    userId, friendId
  }
  const frienduser = new friendUser(friendObject);
  try {
    const foundAsfriend = await friendUser.findOne({ friendId });
    if (foundAsfriend)
      return res.status(500).json({
        message: 'Already as friend'
      })
    frienduser.save().then(data => {
      res.status(201).json({
        data
      })
    })

  } catch (e) {
    res.status(400).send(e)
  }
});


router.get('/getAllMyFriends/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const allFriends = await friendUser.find({ userId: userId }).exec();
    let fArray = allFriends.map(id => id.friendId);
    const data = await User.find({ _id: { $in: fArray } })
    res.status(201).json({
      data: data.map(user => user.name),
      friends_count: allFriends.length
    })
  } catch (e) {
    res.status(400).send(e)
  }
});


router.delete('/deleteFriendById/:friendId', async (req, res) => {
  const userId = req.params.friendId;
  try {
    const allFriends = await friendUser.deleteOne({ friendId: userId }).exec();
    console.log(allFriends)
    res.status(201).json({
      //  data : allFriends,
      friends_count: allFriends.length
    })
  } catch (e) {
    res.status(400).send(e)
  }
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
        if (err)
          throw err
        else {
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