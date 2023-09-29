const User = require("../models/User");
// const bcrypt = require("bcrypt");

const registerNewUser = async (req, res) => {
  const { user, pwd, firstname, surname, email } = req.body;
  if (!user || !pwd || !firstname || !surname || !email) {
    return res.status(400).json({
      message: "Username, password, name, surname and email are required.",
    });
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    // const hashedPwd = await bcrypt.hash(pwd, 10);
    const hashedPwd = pwd;

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
      firstname: firstname,
      surname: surname,
      email: email,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerNewUser };
