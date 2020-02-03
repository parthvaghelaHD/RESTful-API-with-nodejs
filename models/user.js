const mongoose = require('mongoose');
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const User = require('../api/routes/users')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 7,
  },
  mobile: {
    type: String,
    required: true,
  } 
  // token: {
  //   type: String,
  //   required: true
  // }
});

// userSchema.methods.generateAuthToken = async function() {
//   const user = this
//   const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecretkey')
//   return token;
// }


// userSchema.static.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email })
//   if(!user) {
//     throw new Error('unable to login') 
//   }
//   const isMatch = await bcrypt.compare(password, user.password)
//   if(!isMatch){
//     throw new Error ('unable to login')
//   }
//   return user;
// }

userSchema.pre('save', async function(next) {
  const user = this
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;
