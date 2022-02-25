const router = require('express').Router();
const Category = require('../models/Category');
const {authenticateToken} = require("../utils/token");
const Post = require("../models/Post");

// create
router.post('/', authenticateToken, async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const saveCategory = await newCategory.save();
    res.status(200).json(saveCategory);
  } catch(err) {
    res.status(500).json(err);
  }
})

// update



// get
router.get('/', async (req, res) => {
  const id = req.query.id;
  if (id) {
    try {
      const category = await Category.findById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json('Category not found');
    }
  } else {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  }
})


// delete





module.exports = router;
