const express = require('express');
const Post = require('./posts-model');
const { validatePostId, validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Post.get()
  .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Post.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error"})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Post.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted" })
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error"})
    })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Post.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json(req.body)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error"})
    })
});

// do not forget to export the router
module.exports = router;