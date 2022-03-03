const router = require('express').Router();
const Post = require('../models/Post');

// get
router.get('/', async (req, res) => {
  try {
    const data = req.query;
    let posts;
    if (data?.categories) {
      console.log(data)
      posts = await Post.find({
        categories: {
          $in: [data.categories]
        }
      })
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})


// delete





module.exports = router;
