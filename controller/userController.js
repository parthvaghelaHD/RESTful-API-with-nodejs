const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/user");
const friendUser = require("../models/friend");
require("dotenv").config();

exports.adduser = async (req, res) => {
    let createUser;
    try {
      createUser = new User(req.body);
      createUser.save();
    } catch (error) {
      res.status(400).send(error);
    }
    res.send(createUser);
  };

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const obj = {
    email,
    password
  };
  try {
    const token = jwt.sign({ obj },{ expiresIn : '30s'},  process.env.SECRET_KEY);
    res.send({ token });
  } catch (e) {
    res.status(500).json({
      message: error
    });
  }
};

exports.getalluserbyname = async (req, res) => {
  try {
    const users = await User.findOne({ name: req.params.name });
    if (!users) {
      return res.status(404).json({
        message: "user not found from get"
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
        message: "user not found from delete"
      });
    }
  } catch (error) {
    res.send(error);
  }
  res.send(user);
};

exports.edituserbyname = async (req, res) => {
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
};

