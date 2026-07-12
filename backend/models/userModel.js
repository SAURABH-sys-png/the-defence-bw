const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,'Name is Requiered'],
  },
  email: {
    type: String,
    required: [true,'Email is requiered'],
    unique: true,
  },
  password: {
    type: String,
    required: [true,'Password is requiered']
  },
});

module.exports = mongoose.model('User', userSchema);

// Hash the password before saving the user