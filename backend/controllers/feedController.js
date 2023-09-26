const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateUserFeed = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  //feed per utente loggato
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token

      const { userFollowed, subscribedChannel } = User.findById(
        //questa roba funziona?
        decoded.UserInfo.id
      );

      //mettere in ordine cronologico tutti i post di tutti gli utenti seguiti
      //mettere in ordine cronologico i messaggi nei canali
    });
  } else {
    //crea feed per utente non loggato
    const { userFollowed, subscribedChannel } = User.findById(
      //questa roba funziona?
      decoded.UserInfo.id
    );
    console.log(userFollowed);
  }
};

module.exports = {
  generateUserFeed,
};
