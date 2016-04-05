var app = angular.module('avalon', [
  'avalon.services',
  'avalon.signup',
  'avalon.lobby',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider){
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'SignupController'
    })
    .when('/lobby', {
      templateUrl: 'app/lobby/lobby.html',
      controller: 'LobbyController'
    })
    .otherwise({
      redirectTo:'/signup'
    });
}).run(function ($rootScope, $location){
});
