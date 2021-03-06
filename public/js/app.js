var app = angular.module('rereddit', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'MainCtrl',
        resolve: {
	    postPromise: ['posts', function (posts){
	      return posts.getAll();
	    }]
	  }

      })
      .state('post', {
        url: '/posts/:id',
        templateUrl: '/templates/posts.html',
        controller: 'PostsCtrl',
        resolve:{
          postPromise: ['posts', '$stateParams', function(posts, $stateParams){
            console.log($stateParams.id);
            posts.get($stateParams.id);
          }]
        }
      });

      $urlRouterProvider.otherwise('home');
}]);
