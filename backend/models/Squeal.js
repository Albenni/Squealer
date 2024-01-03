const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const squealSchema = new Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  publicSqueal: {
    type: Boolean,
    default: false,
  },
  //contiene l'id dei canali o delle keyword
  receivers: [
    {
      group: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: "receivers.groupType",
      },
      groupType: {
        type: String,
        enum: ["Channel", "Keyword"],
      },
    },
  ],
  //parametro che indica se lo squeal è stato inviato in un CANALE ufficiale
  //utilizzato nel feed per utenti non registrati
  officialChannel: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: {
      values: ["text", "image", "video", "geolocalization"],
      message: "{VALUE} is not supported",
    },
  },
  tempGeolocation: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: {
      values: ["popolare", "impopolare", "controverso"],
      message: "{VALUE} is not supported",
    },
  },
  impression: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Squeal", squealSchema);
