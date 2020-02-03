const express = require("express");
const router =  express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require("dotenv").config();


const User = require("../../models/user");
const friendUser = require("../../models/friend");

const userController = require("../../controller/userController");
// create an user
router.post("/users/add", userController.adduser);
// Find user by name
router.get("/users/:name", userController.getalluserbyname);
//edit an user
router.patch("/users/:name", userController.edituserbyname);
//delete an user
router.delete("/users/:name", userController.deleteuserbyname);
//login

router.post("/users/login", userController.login);



function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(500).send('INVALID TOKEN')
  }
}



router.post('/users/verify', verifyToken, (req, res)=> {
  jwt.verify(req.token, process.env.SECRET_KEY , (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        message : "POST CREATED",
        authData
      })
    }
    
  })
});


module.exports = router;
