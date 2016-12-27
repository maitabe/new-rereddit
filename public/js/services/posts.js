app.factory('posts', ['$http', function($http) {
    var postService = {
      posts: [],

      getAll: function() {
        return $http.get('/posts').then(function(data) {

          angular.copy(data.data, postService.posts);
        });
      },

      // for GETting one post and it's comments
      get: function(id) {

      },

      // for POSTing one new post
      create: function(post) {

      },

      // for increasing the upvotes to one post
      upvote: function(post) {

      },

      // for adding a comment to one post
      addComment: function(id, comment) {

      },

      // for upvoting a comment on a specific post
      upvoteComment: function(post, comment) {

      }
    };

    return postService;
  }]);
