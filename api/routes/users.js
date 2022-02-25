const router = require('express').Router();
const User = require('../models/User');
const {authenticateToken} = require("../utils/token");
const bcrypt = require("bcrypt");


// update
router.put('/', authenticateToken, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  try {
    const updateUser = await User.findByIdAndUpdate(req.body.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
})

// delete
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
