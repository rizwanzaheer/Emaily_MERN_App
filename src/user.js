const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;