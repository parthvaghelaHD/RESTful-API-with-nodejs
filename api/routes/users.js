const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

// Find user by name
router.get('/users/:name', async (req, res) => {
  try {
    const users = await User.findOne({ 'name': req.params.name })
    if (!users) {
      return res.status(404).json({
        message: "user not found"
      });
    }
  } catch (error) {
    res.status(500).send(error)
  }
  res.send(users);

});

// create an user
router.post('/users/add', async (req, res) => {
  try {
    const createUser = new User(req.body);
    createUser.save().then((data) => {
      data: data
    })
    res.send(createUser)
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
});

//edit an user
router.patch('/users/:name', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ 'name': req.params.name }, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).json({
        message: "user not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
  res.send(user);
})

//delete an user
router.delete('/users/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOneAndRemove({ 'name': name }, req.body)
    if (!user) {
      res.status(404).json({
        message: "user not found"
      })
    }
  } catch (error) {
    res.send(error);
  }
  res.send(user);
})

module.exports = router;