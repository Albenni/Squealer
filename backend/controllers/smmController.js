const mongoose = require("mongoose");
const User = require("../models/User");
const Smm = require("../models/Smm");

const getVipsManaged = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const vips = Smm.find({ smmId: req.params.userId });
  if (!vips) return res.status(204).json({ message: "No vips associated" });

  res.status(200).json(vips);
};
const acceptVip = async (req, res) => {};
const removeVip = async (req, res) => {};
const getRequestsForSmm = async (req, res) => {};
const deleteRequest = async (req, res) => {};

module.exports = {
  getVipsManaged,
  acceptVip,
  removeVip,
  getRequestsForSmm,
  deleteRequest,
};
