const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const User = require("../../models/user");


const userController = require('../../controller/userController')
// create an user
router.post("/users/add", userController.adduser)
// Find user by name
router.get("/users/:name", userController.getalluserbyname)
//edit an user
router.patch("/users/:name", userController.edituserbyname)
//delete an user
router.delete("/users/:name", userController.deleteuserbyname)

module.exports = router;
