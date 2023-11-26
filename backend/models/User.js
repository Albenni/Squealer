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
    unique: true,
  },
  professional: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  aumentoQuota: {
    type: Number,
    min: [0, "questo campo non può essere negativo"],
    default: 0,
  },
  aumentoDuration: {
    type: Date,
  },
  dailyChar: {
    type: Number,
    min: [0, "Not enough character available"],
    default: () => constants.DAILY_CHAR,
  },
  weeklyChar: {
    type: Number,
    min: [0, "Not enough character available"],
    default: () => constants.WEEKLY_CHAR,
  },
  monthlyChar: {
    type: Number,
    min: [0, "Not enough character available"],
    default: () => constants.MONTHLY_CHAR,
  },
  profilePic: {
    type: String,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  refreshToken: { type: String },
  resetOTP: { type: String },
});

module.exports = mongoose.model("User", userSchema);
