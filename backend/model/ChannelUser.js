const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("ChannelUser", channelUserSchema);
