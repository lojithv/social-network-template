var mongoose = require('mongoose');
var validator = require('validator');
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    set: function (value) {return value.trim().toLowerCase()},
  },
  email: {
    type: String,
    required: true,
    set: function(value) {return value.trim().toLowerCase()},
    validate: [
      function (email) {
        return validator.isEmail(email);
      }
    ]
  },
  password: { type: String, required: true },
  admin: { type: Boolean, default: true },
  thumbnail: String,
  avatar: { type: String, default: 'img/avatar.png'}
});

module.exports = mongoose.model('User', userSchema);