const User = require('../models/user');
const friendUser = require('../models/friend');

const mongoose = require('mongoose')

async function addnewFriend(req, res) {
  const userId = req.body.userId;
  const friendId = req.params.id;
  const friendObject = {
    userId, friendId
  }
  try {
    const frienduser = new friendUser(friendObject);
    const foundAsfriend = await friendUser.findOne({ friendId });
    if (foundAsfriend){
      return res.status(500).json({
        message: 'Already as friend'
      });
    }
    frienduser.save().then(data => {
      res.status(201).json({
        data: data
      });
    });
  } catch (e) {
    res.status(400).send(e)
  }
};

async function countFriend(req, res) {
  const userId = req.params.id;
  try {
    const allFriends = await friendUser.find({ userId: userId });
    let friendArray = allFriends.map(id => id.friendId);
    const data = await User.find({ _id: { $in: friendArray } });
    res.status(201).json({
      data: data.map(user => user.name),
      friends_count: allFriends.length
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

async function deleteFriend(req, res) {
  const userId = req.params.friendId;
  try {
    const allFriends = await friendUser.deleteOne({ friendId: userId }).exec();
    res.status(201).json({
      //  data : allFriends,
      friends_count: allFriends.length
    })
  } catch (e) {
    res.status(400).send(e)
  }
};

module.exports = { addnewFriend, countFriend, deleteFriend}