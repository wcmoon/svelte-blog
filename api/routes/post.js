const router = require('express').Router();
const Post = require('../models/Post');
const {authenticateToken} = require("../utils/token");

// create
router.post('/', authenticateToken, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch(err) {
    res.status(500).json(err);
  }
})

// update
router.put('/', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.body.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updatedPost);
    } catch(err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(400).json('no such post')
  }
})


// get
router.get('/', async (req, res) => {
 try {
   const post = await Post.findOne({title: req.query.title});
   res.status(200).json(post);
 } catch (err) {
   res.status(500).json(err);
 }
})


// delete
router.delete('/', async (req, res) => {
  try {
    console.log(req.body);
    const post = await Post.findOneAndDelete({title: req.body.title});
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err);
  }
})





module.exports = router;
