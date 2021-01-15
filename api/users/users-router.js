const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
const { validatePost, validateUser, validateUserId } = require('../middleware/middleware');

const router = express.Router();


router.post('/', validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" })
    });
});

router.get('/:id', validateUserId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(500).json({ message: "internal server error" })
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "successfully removed"})
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json({ message: `Successfully updated ${user} user/s`})
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
  .catch(() => {
    res.status(500).json({ message: "internal server error" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" })
    })
});

// do not forget to export the router
module.exports = router;