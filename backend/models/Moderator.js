const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moderatorSchema = new Schema({
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
  refreshToken: String,
});

module.exports = mongoose.model("Moderator", moderatorSchema);
