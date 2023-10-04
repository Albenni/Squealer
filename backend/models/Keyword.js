const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keywordSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Keyword", keywordSchema);
