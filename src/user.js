const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name Must be longer then 2 characters."
    },
    required: [true, "Name is required!"]
  },
  postCount: Number
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
