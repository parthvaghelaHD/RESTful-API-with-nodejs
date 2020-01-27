const mongoose = require('mongoose');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");

const user2Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
  }
},
  { 
    versionKey: false });

user2Schema.plugin(uniqueValidator);
const User2 = mongoose.model('User', userSchema);
module.exports = User2;
