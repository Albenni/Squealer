const mongoose = require("mongoose");
const constants = require("../config/constants");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  professional: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  charAvailable: {
    type: Number,
    min: [0, "Not enough character available"],
    default: () => constants.DAILY_CHAR,
  },
  profilePic: {
    type: String,
  },
  refreshToken: { type: String },
  resetOTP: { type: String },
});

module.exports = mongoose.model("User", userSchema);
