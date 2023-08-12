const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelRedSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
});

module.exports = mongoose.model("ChannelRed", channelRedSchema);
