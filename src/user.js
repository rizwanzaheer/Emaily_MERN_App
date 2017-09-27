const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name Must be longer then 2 characters."
    },
    required: [true, "Name is required!"]
  },
  likes: Number,
  posts: [PostSchema]
});

// virtual prop created on fly
// ES6 getter & setter fun
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
