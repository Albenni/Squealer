const User = require("../models/User");
const Moderator = require("../models/Moderator");
const jwt = require("jsonwebtoken");

const userRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.status(403); //Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.status(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          id: foundUser._id,
          isMod: false,
          isSmm: decoded.isSmm,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

const modRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;

  const foundMod = await Moderator.findOne({ refreshToken }).exec();
  if (!foundMod) return res.status(403); //Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundMod.username !== decoded.username) return res.status(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          id: foundMod._id,
          isMod: true,
          isSmm: false,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { userRefreshToken, modRefreshToken };
