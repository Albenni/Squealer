const mongoose = require("mongoose");
const Smm = require("../models/Smm");

//onlyAccepted nella query per ritornare i vip già accettati o quelli che hanno fatto richiesta
const getVipsManaged = async (req, res) => {
  // if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });

  const query = {
    smmId: req.params.userId,
    accepted: req?.query?.onlyAccepted === "true",
  };

  const vips = await Smm.find(query);
  if (!vips?.length)
    return res.status(204).json({ message: "No vips associated" });

  res.status(200).json(vips);
};

const acceptVip = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.vipId))
    return res.status(400).json({ message: "Vip ID invalid" });

  try {
    const result = await Smm.findOneAndUpdate(
      {
        vipId: req.params.vipId,
        smmId: req.params.userId,
      },
      {
        accepted: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeVip = async (req, res) => {
  if (!req.authorized) return res.status(403).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "User ID invalid" });
  if (!mongoose.Types.ObjectId.isValid(req?.params?.vipId))
    return res.status(400).json({ message: "Vip ID invalid" });

  try {
    const result = await Smm.findOneAndRemove({
      vipId: req.params.vipId,
      smmId: req.params.userId,
    });
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getVipsManaged,
  acceptVip,
  removeVip,
};
