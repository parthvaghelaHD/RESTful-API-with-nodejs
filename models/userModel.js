const mongoose = require('mongoose');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 7,
    validator(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('password not contain "password" ')
      }
    }
  },
  mobilenumber: { 
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;
