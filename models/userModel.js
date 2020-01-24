const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobilenumber: {
    type: String
  }
},{
  versionKey: false // You should be aware of the outcome after set to false
});

const User = mongoose.model('User', userSchema);
module.exports = User;