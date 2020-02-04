const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
const friendUser = require('../../models/friend');

const friendsController = require('../../controller/friendsController');

//add as friend via id
router.post('/friends/:id', friendsController.addnewfriend);
//get friends via id
router.get('/friends/:id', friendsController.countFriend);
//delete friend via id
router.delete('/friends/:id', friendsController.deleteFriend);

module.exports = router;