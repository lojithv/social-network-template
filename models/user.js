var mongoose = require('mongoose');
var validator = require('validator');
var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    set: function(value) {return value.trim().toLowerCase()},
    validate: [
      function(email) {
        return validator.isEmail(email);
      }
    ]
  },
  password: String,
  admin: {
    type: Boolean,
    default: true
  },
  thumbnail: String,
  avatar: String
});

module.exports = mongoose.model('User', userSchema);