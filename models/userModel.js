const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email is already registered"],
  },
  phone: {
    type: String,
    required: [true, " Phone number required"],
    min: [13, "Too Few. Not valid number. Eg. +91-XXXXXXXXX"],
    max: [13, "Too long. Not valid number. Eg. +91-XXXXXXXXX"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    min: [8, "Too Few. Not valid Password."],
    max: [10, "Too long. Not valid Password"],
  },
  isAdmin:{
    type: Boolean,
  }
});
module.exports = mongoose.model("user", userSchema, "user");
