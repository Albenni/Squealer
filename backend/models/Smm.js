const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const smmSchema = new Schema({
  vipId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  smmId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  accepted: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Smm", smmSchema);
