const router = require("express").Router();
const Post = require("../models/Post");

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username }).sort({createdAt:-1});
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        }).sort({createdAt:-1});
      } else {
        posts = await Post.find().sort({createdAt:-1});
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;