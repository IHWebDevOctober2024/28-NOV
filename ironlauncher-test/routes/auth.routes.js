const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

router.post("/signup", async (req, res, next) => {
  const { name, password, email } = req.body;

  // to encrypt the password:
  const encryptedPassword = bcrypt.hashSync(password, salt);

  const newUser = {
    name,
    email,
    password: encryptedPassword,
  };

  if (!name || !password || !email) {
    res.status(406).json({ message: "All fields are mandatory" });
  }

  try {
    const response = await User.create(newUser);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { password, email } = req.body;

  console.log("THIS IS THE BODY: ", { email });

  const foundUser = await User.findOne({ email });
  console.log(foundUser);

  if (foundUser) {
    const passwordMatch = bcrypt.compareSync(password, foundUser.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      res.status(406).json({ message: "Incorrect password" });
    } else {
      res.json({ message: "Welcome!" });
    }
  } else {
    res.status(404).json({ message: "User not found, try again" });
  }
});

module.exports = router;
