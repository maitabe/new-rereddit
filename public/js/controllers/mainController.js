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

    item.upvotes += 1;

    console.log(item);
    console.log(item.upvotes);

    posts.upvote(item);
  };
}]);