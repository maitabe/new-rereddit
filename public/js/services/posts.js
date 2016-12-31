app.factory('posts', ['$http', function($http) {
    var postService = {
      posts: [],
      //fill up one post
      post: {},

      getAll: function() {
        return $http.get('/posts').then(function(data) {
        	console.log(data);
          angular.copy(data.data, postService.posts);
        });
      },

      // for GETting one post and it's comments
      get: function(id) {
      	return $http.get('/posts/' + id ).then(function(data) {
      		angular.copy(data.data, postService.post);
      		console.log(postService.post);
      	});
      },

      // for POSTing one new post
      create: function(post) {
      	return $http.post('/posts', post);
      },

      // for increasing the upvotes to one post
      upvote: function(post) {
        return $http.put('/posts/'+ post._id + '/upvote', post).then(function(res) {

            console.log('updateSucceed =', res.data);

            if(!res.data){
                console.error('upvote didnt succeed!' );
            }
        });
      },

      // for adding a comment to one post
      addComment: function(id, comment) {
      	return $http.post('/posts/'+ id + '/comments', comment).then(function(data) {
      		console.log(data);
          postService.post.comments.push(data.data);
      	});
      },

      // for upvoting a comment on a specific post
      upvoteComment: function(post, comment) {

      }
    };

    return postService;
  }]);
