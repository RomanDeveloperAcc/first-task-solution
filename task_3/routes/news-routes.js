const { Router } = require("express");

const NewsPost = require("../models/news-post");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await NewsPost.find();
    res.json(posts);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  const post = new NewsPost({
    email: req.body.email,
    title: req.body.title,
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
