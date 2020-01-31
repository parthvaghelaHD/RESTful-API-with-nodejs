const User = require('../models/user');
const friendUser = require('../models/friend');
var bcrypt = require("bcryptjs");

const mongoose = require('mongoose')

exports.adduser = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    else {
      req.body.password = hash;
      try {
        const createUser = new User(req.body);
        createUser.save().then(data => {
          data: data;
        });
        res.send(createUser);
      } catch (error) {
        res.status(400).json({
          message: error
        });
      }
    }
  });
};

exports.getalluserbyname = async (req, res) => {
  try {
    const users = await User.findOne({ name: req.params.name });
    if (!users) {
      return res.status(404).json({
        message: "user not found"
      });
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteuserbyname = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOneAndRemove({ name: name }, req.body);
    if (!user) {
      res.status(404).json({
        message: "user not found"
      });
    }
  } catch (error) {
    res.send(error);
  }
  res.send(user);
};

exports.edituserbyname =  async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({
        message: "user not found"
      });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};



 