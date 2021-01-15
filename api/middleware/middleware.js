const User = require('../users/users-model');
const Post = require('../posts/posts-model');

function logger(req, res, next) {
  // do your magic!
  // console.log(req)
  console.log(req.method)
  console.log(req.baseUrl + req.url)
  console.log(new Date())
  next()
}

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found"})
      }
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error"})
    })

}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400).json({ message: "missing user data"})
  }
  if (req.body && req.body.name){
    next()
  } else {
    res.status(400).json({ message: "missing required name field" })
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  Post.getById(req.params.id)
  .then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).json({ message: "post not found"})
    }
  })
  .catch(() => {
    res.status(500).json({ message: "internal server error"})
  })
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400).json({ message: "missing user data"})
  }
  if (req.body && req.body.text && req.body.user_id){
    next();
  } else {
    res.status(400).json({ message: "missing required text or user_id fields" })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validatePostId,
  validateUser,
  validateUserId
}