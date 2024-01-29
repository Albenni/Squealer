const User = require("../models/User");
// const Moderator = require("../models/Moderator");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const ncrypt = require("ncrypt-js");

// Body {email: string}
// Return {userId: string}
const sendResetOTP = async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Email not provided" });

  //Controllo se l'email è presente nel db
  if (!(await User.exists({ email: req.body.email })))
    return res.status(404).json({ message: "User not found" });

  //Trovo l'utente tramite l'email
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) return res.status(404).json({ message: "User not found." });

  //Creo un OTP
  const OTP = Math.floor(100000 + Math.random() * 900000);

  //Salvo il momento in cui è stato creato l'OTP
  const OTPCreationTime = Date.now();

  const otpobj = {
    OTP: OTP,
    OTPCreationTime: OTPCreationTime,
  };

  // console.log(OTPCreationTime);

  const ncryptObject = new ncrypt(process.env.EN_KEY);

  //Cripto insieme OTP e momento di creazione e salvo il risultato nel db
  const OTPCrypted = ncryptObject.encrypt(JSON.stringify(otpobj));

  try {
    const result = await User.findByIdAndUpdate(
      foundUser._id,
      { resetOTP: OTPCrypted },
      { new: true }
    ).exec();

    if (!result) return res.status(404).json({ message: `User not found 2` });
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

  const recipient_email = req.body.email;

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: recipient_email,
    subject: "Codice per il reset della password",
    html: `<html>
               <body>
                 <h2>Recupero della password</h2>
                 <p>Usa questo OTP per recuperare la tua password. L'OTP sarà valido per i prossimi 5 minuti.</p>
                 <h3>${OTP}</h3>
               </body>
             </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "An error occurred while sending the email" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .send({ message: "Email sent successfully", userId: foundUser._id });
    }
  });
};

// Body {userEmail: string, OTP: string, newpassword: string}
const resetPassword = async (req, res) => {
  if (!req.body.OTP || !req.body.newpassword || !req.body.userEmail)
    return res
      .status(400)
      .json({ message: "OTP, new password or userEmail not provided" });

  //Controllo se l'utente è presente nel db

  if (!(await User.exists({ email: req.body.userEmail })))
    return res.status(404).json({ message: "User doesn't exist" });

  const foundUser = await User.findOne({
    email: req.body.userEmail,
  }).exec();

  if (!foundUser) return res.status(404).json({ message: "User not found." });

  // Descripto il token e controllo che l'OTP sia valido
  const ncryptObject = new ncrypt(process.env.EN_KEY);

  const OTPDecrypted = ncryptObject.decrypt(foundUser.resetOTP);

  const OTPDecryptedObj = JSON.parse(OTPDecrypted);

  // Controllo che l'operazione sia stata fatta nei limiti di tempo
  const timenow = Date.now();

  if (OTPDecryptedObj.OTPCreationTime + 300000 < timenow)
    return res.status(400).json({ message: "Time elapsed" });

  if (OTPDecryptedObj.OTP.toString() !== req.body.OTP)
    return res.status(400).json({ message: "Invalid OTP" });

  // Aggiorno la password nel db
  try {
    // Controllo che la vecchia password sia diversa dalla nuova
    if (foundUser.password === req.body.newpassword) {
      return res
        .status(400)
        .json({ message: "Password is the same as the old one" });
    }

    // Aggiorno la password con save
    foundUser.password = req.body.newpassword;
    await foundUser.save();

    // Ritorno lo user aggiornato
    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Si è verificato un errore durante l'aggiornamento della password",
      error,
    });
  }
};

module.exports = { sendResetOTP, resetPassword };
