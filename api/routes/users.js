const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const User = require("../../models/user");
const friendUser = require("../../models/friend");
const { verifyToken } = require('../../middelware/middelware')

const userController = require("../../controller/userController");

// create an user
router.post("/users/", userController.adduser);
// Find user by name
router.get("/users/", userController.getuserbyname);
//edit an user
router.patch("/users/:name", userController.edituserbyname);
//delete an user
router.delete("/users/:name", userController.deleteuserbyname);
//login create a jwt token
router.post("/users/login", userController.login);  
//verify token which is created by login user
router.post('/users/verify', verifyToken, userController.adduser);

module.exports = router;
