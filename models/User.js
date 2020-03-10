const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: false
  },
  passwordSalt: {
    type: String,
    required: false
  },
  externalType: {
    type: String,
    required: true
  },
  externalID: {
    type: String,
    required: false
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;