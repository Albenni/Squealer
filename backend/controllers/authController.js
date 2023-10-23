const User = require("../models/User");
const Moderator = require("../models/Moderator");
const Smm = require("../models/Smm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const modLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await Moderator.findOne({ username: user }).exec();
  if (!foundUser) return res.status(401); //Unauthorized
  // evaluate password
  // const match = await bcrypt.compare(pwd, foundUser.password);
  const match = pwd === foundUser.password; // controllo se password coincidono
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id,
        isMod: true,
        isSmm: false,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username, isMod: true, isSmm: false },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // Saving refreshToken with current user
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, userid: foundUser._id });
};

const userLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(404).json({ message: "User not found." });
  // confronti le password nel caso in cui sia salvata come hash
  // const match = await bcrypt.compare(pwd, foundUser.password);
  const match = pwd === foundUser.password; // controllo se password coincidono
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  if (foundUser.blocked)
    return res.status(403).json({ message: "Account Blocked" });

  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id,
        isMod: false,
        isSmm: false,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username, isMod: false, isSmm: false },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // Saving refreshToken with current user
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, userid: foundUser._id });
};

const smmLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(404).json({ message: "User not found." });
  // confronti le password nel caso in cui sia salvata come hash
  // const match = await bcrypt.compare(pwd, foundUser.password);
  const match = pwd === foundUser.password; // controllo se password coincidono
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  if (foundUser.blocked)
    return res.status(403).json({ message: "Account Blocked" });

  if (!foundUser.professional)
    return res.status(403).json({ message: "User not professional." });

  // da controllare
  const foundSmm = await Smm.findOne({ smmId: foundUser._id }).exec();
  if (!foundSmm) return res.status(403).json({ message: "No VIP associated." });

  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id,
        isMod: false,
        isSmm: true,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username, isMod: false, isSmm: true },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // Saving refreshToken with current user
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, userid: foundUser._id });
};

module.exports = { userLogin, modLogin, smmLogin };
