const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      //invalid token
      req.authorized = false;
    } else {
      req.authorized = true;
      req.username = decoded.UserInfo.username;
      req.id = decoded.UserInfo.id;
      req.isMod = decoded.UserInfo.isMod;
      req.isSmm = decoded.UserInfo.isSmm;
    }
    next();
  });
};

module.exports = verifyJWT;
