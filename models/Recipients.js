const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  email : String ,
  responded : {
    type : Boolean,
    default: false
  }
});
