app.factory('posts', ['$http', function($http) {
    var postService = {
      posts: [],
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
      	})
      },

      // for POSTing one new post
      create: function(post) {

      	return $http.post('/posts', post);
      },

      // for increasing the upvotes to one post
      upvote: function(post) {

      },

      // for adding a comment to one post
      addComment: function(id, comment) {
      	return $http.post('/posts/'+ id + '/comments', comment).then(function(data) {
      		console.log(data);

      	});
      },

      // for upvoting a comment on a specific post
      upvoteComment: function(post, comment) {

      }
    };

    return postService;
  }]);
