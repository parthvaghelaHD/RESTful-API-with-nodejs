const User = require("../models/user");
const friendUser = require("../models/friend");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

async function adduser(req, res) {
  let createUser;
  try {
    createUser = new User(req.body);
    createUser.save();
  } catch (err) {
    res.status(400).json({
      message: err
    });
    res.send(createUser);
  }
}

async function login(req, res) {
  try {
    const token = await jwt.sign(req.body.email, process.env.SECRET_KEY);
    res.send({ token });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
}

async function getuserbyname(req, res) {
  try {
    const users = await User.findOne({ name: req.query.name });
    if (!users) {
      return res.status(404).json({
        message: "user not found from get"
      });
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteuserbyname(req, res) {
  const name = req.params.name;
  try {
    const user = await User.findOneAndRemove({ name: name }, req.body);
    if (!user) {
      res.status(404).json({
        message: "user not found from delete"
      });
    }
  } catch (error) {
    res.send(error);
  }
  res.send(user);
}

async function edituserbyname(req, res) {
  const updates = Object.keys(req.body);
  const allowUpdate = ["name", "email", "password", "mobile"];
  const isValidOperations = updates.every(update =>
    allowUpdate.includes(update)
  );
  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid Operations " });
  }
  try {
    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({
        message: "user not found from edit"
      });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
}

module.exports = {
  adduser,
  login,
  getuserbyname,
  deleteuserbyname,
  edituserbyname
};
