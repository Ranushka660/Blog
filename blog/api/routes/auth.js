const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
//REGISTER
router.post("/register", async (req, res) => {
  try {

    const { email } = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      userType:"0",
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials1!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials2!");

    const { password, ...others } = user._doc;

    const { email, _id } = others;

      // Create token
    const token = jwt.sign(
    { user_id: _id, email },
      process.env.TOKEN_KEY,
    {
      expiresIn: "7D",
    }
    );

    // save user token
    others.token = token;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
