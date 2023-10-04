const mongoose = require("mongoose");
const User = require("../models/User");
const Smm = require("../models/Smm");

const getVipsManaged = async (req, res) => {};
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
