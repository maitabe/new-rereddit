var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// db objects of mongoose
var Post = require('.././models/Posts');
var Comment = require('.././models/Comments');

router.get('/', function(req, res, next) {
  res.send('this is from /!');
});

//get all posts from db
router.get('/posts', function(req, res, next) {
	Post.find(function (error, post) {
		res.send(post);
	});
});

//get specific post from db
router.get('/posts/:post', function(req, res, next) {
  console.log(req.post);
  req.post.populate('comments', function(err,post) {
    res.send(post);
  });
});

//add a new post
router.post('/posts', function(req, res, next) {
	console.log('yoyo');

  var post = new Post(req.body);

  post.save(function(err, post){
    console.log(post);
    if (err) {
      //next(err);
      res.json(err);
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
  console.log(req.post);
  var comment = new Comment(req.body);
  comment.post = req.post._id;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    console.log(req.post);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//update upvotes on post
router.put('/posts/:post/upvote', function(req, res, next) {
  // req.post.upvote();

  // find post in DB
  Post.findById(req.body._id, function(err, currentDbPost){

      // update property value in DB post obj
      currentDbPost.upvotes++;

      // save changes to DB
       currentDbPost.save(function(err, currentDbPost){
         if(err){console.error(err); res.send(false);}
         else {res.send(true);}
       });
 });

      //method to update the property of the existing object
  /*  Post.update({_id: req.body._id},{upvotes: num}, function(err,affected) {
     console.log('affected rows %d', affected);
     });

     mPost.save(function(err, UpdatedPost) {
     res.json(UpdatedPost);
     });*/

});

//update upvotes on comments
router.put('/comments/:comment/upvote', function(req, res, next) {

  //get comment from db
    Comment.findById(req.params.comment, function(err, currentPostComm) {
        // update property value in DB
        currentPostComm.upvotes++;

        // save changes to DB
        currentPostComm.save(function(err){
            if(err){console.error(err); res.send(false);}
            else {res.send(true);}
        })
    });







  //req.comment.upvote();

  //req.comment.save(function(err, comment) {
  //  res.json(comment);
  //});
});

module.exports = router;