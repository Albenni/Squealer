const User = require("../models/User");
// const Moderator = require("../models/Moderator");
const mongoose = require("mongoose");

// Body {email: string}
// Return {userId: string}
const sendResetOTP = async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Email not provided" });

  //Controllo se l'email è presente nel db

  //Trovo l'utente tramite l'email

  //Creo un OTP
  const OTP = Math.floor(100000 + Math.random() * 900000);

  //Salvo il momento in cui è stato creato l'OTP

  //Cripto insieme OTP e momento di creazione e salvo il risultato nel db

  // console.log(OTP);

  try {
    const result = await User.findByIdAndUpdate(
      // req.params.userId,
      { resetOTP: OTP },
      { new: true }
    ).exec();

    if (!result) return res.status(404).json({ message: `User not found` });

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
  // Invio l'OTP all'utente per mail

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Ritorno un messaggio di successo
};

// Body {OTP: string, newpassword: string}
const resetPassword = async (req, res) => {
  // Descripto il token e controllo che l'OTP sia valido
  // Controllo che l'operazione sia stata fatta nei limiti di tempo
  // Controllo che l'OTP sia valido
  // Controllo che la nuova password sia valida
  // Aggiorno la password nel db
};

module.exports = { sendResetOTP, resetPassword };
