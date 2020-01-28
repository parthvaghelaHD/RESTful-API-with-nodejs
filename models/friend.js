const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userFriend = new mongoose.Schema({
 userId  : {
   type : String
 },
 friendId : {
   type : String
 }
});

userFriend.plugin(uniqueValidator);
const friend = mongoose.model('Friend', userFriend);
module.exports = friend;
