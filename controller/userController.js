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
    await createUser.save();
    res.send(createUser);
    return;
  } catch (err) {
    res.status(400).json({
      message: "error"
    });
  }
}

async function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, User) {
    if (err) return res.status(500).send("Error on the server.");
    if (!User) return res.status(404).send("No user found.");
    // if (req.body.password !== User.password)
    //   return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ name: User.name }, process.env.SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
}

async function getUser(req, res) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    await User.find({ name: decoded.name }, function(err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  });
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
  edituserbyname,
  getUser
};
