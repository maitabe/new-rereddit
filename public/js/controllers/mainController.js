app.controller('MainCtrl', ['$scope','posts', function($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if ($scope.title === '') { return; }

    var newPost = {
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    };

    $scope.title = '';
    $scope.link = '';

    posts.create(newPost).then(function(data){
    	console.log(data.data);
    	$scope.posts.push(data.data);
    }).catch(function(err){
		console.error(err);
    });

  };

  $scope.incrementUpvotes = function(item) {

    // update DOM
    item.upvotes += 1;

    // updating state
    posts.upvote(item);
  };

  //increment upvotes for comments
  $scope.incrementUpvotesComm = function(post, comment) {

    // update DOM
    comment.upvotes += 1;

    // updating state
    posts.upvoteComment(post, comment);
  };

}]);