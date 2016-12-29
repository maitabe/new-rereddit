var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//
var Post = require('.././models/Posts');
var Comment = require('.././models/Comments');

router.get('/', function(req, res, next) {
  res.send('this is from /!');
});

//get all posts from db
router.get('/posts', function(req, res, next) {
	Post.find(function (error, post) {
		res.send(post);
	})
});

//add a new post
router.post('/posts', function(req, res, next) {
	console.log('yoyo');

  var post = new Post(req.body);

  post.save(function(err, post){
    console.log(post);
    if (err) {
      //next(err);
      res.json(err)
    }
    else res.json(post);
  });

});

//find a post  by id
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

//find the comment by id
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

//add new comment to specific post
router.post('/posts/:post/comments', function(req, res, next) {
  console.log(req.body);
  var comment = new Comment(req.body);
  // comment.post = req.post;
  comment.post = req.post._id;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//get specific post from db
router.get('/posts/:post', function(req, res, next) {
	console.log(req.post);
	req.post.populate('comments', function(err,post) {
		res.send(post);
	})
});

//update upvotes on post
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote();


  req.post.save(function(err, post) {
    res.json(post);
  });
});

//update upvotes on comments
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote();

  req.comment.save(function(err, comment) {
    res.json(comment);
  });
});


module.exports = router;