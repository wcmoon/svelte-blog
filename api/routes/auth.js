const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require("../utils/token");

// register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    })
    const user = await newUser.save();
    const {password, ...others} = user._doc;
    const token = generateAccessToken(user.username);
    res.status(200).json(Object.assign({}, others, {token}));
  } catch (err) {
    res.status(500).json(err);
  }
})


// login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
      console.log(user);
      return res.status(400).json('Wrong credentials!')
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      console.log('!validate');
      return res.status(400).json('Wrong credentials!')
    }

    console.log('third');
    const {password, ...others} = user._doc;
    const token = generateAccessToken(user.username);
    console.log(token);
    res.status(200).json(Object.assign({}, others, {token}));
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
