app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
  $scope.post = posts.post;
  console.log($scope.post.title);

  $scope.addComment = function() {
    if ($scope.body === '') { return; }

    var newComment = {
       body: $scope.body,
       author: 'user',
       upvotes: 0
    }

    posts.addComment($stateParams.id, newComment);

    $scope.body = '';

  }


}]);