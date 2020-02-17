const { Router } = require("express");

const Post = require("../models/post");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    email: req.body.email,
    text: req.body.text
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
