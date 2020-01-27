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
    unique: true,
    lowercase: true,
    index: true,  
    trim: true,
    required: true,
    validator(value){
      if(!validator.isEmail(value)){
        throw new Error(' invalid email ')
      }
    }
  },
  frdId: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }]
});

userSchema.plugin(uniqueValidator);
const User2 = mongoose.model('User2', user2Schema);
module.exports = User2;