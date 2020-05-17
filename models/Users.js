const mongoose = require('mongoose');

//UserSchema for storing users
const userSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  email: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('User', userSchema);
