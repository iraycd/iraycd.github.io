var project = angular.module('project', ['ngRoute']);


project.config(function($routeProvider) {
    $routeProvider
     .when('/', {
        controller:'HomeCtrl',
        templateUrl:'home.html'
    })
    .when('/skills', {
        controller:'SkillCtrl',
        templateUrl:'skills.html'
    })
    .when('/work', {
        controller:'WorkCtrl',
        templateUrl:'work.html'
    })
    .when('/blog', {
        controller:'BlogCtrl',
        templateUrl:'blog.html'
    })
    .otherwise({
        redirectTo:'/'
    });
});


project.controller('HomeCtrl', function($scope) {
});

project.controller('SkillCtrl', function($scope) {
     $scope.skill = "active";
});
 
project.controller('WorkCtrl', function($scope) {
     $scope.work = "active";
});
 
project.controller('BlogCtrl', function($scope,$http) {
     $scope.blog = "active";
     $http.get('/ph_postings_meta.json').success(function(data) {
        $scope.posts = data.posts;
        $scope.posts.pop();
      });
});