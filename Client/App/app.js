angular.module('avalon', [
  'avalon.services',
  'avalon.signup',
  'avalon.lobby',
  'avalon.game',
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
    .when('/game', {
      templateUrl: 'app/game/game.html',
      controller: 'GameController'
    })
    .otherwise({
      redirectTo:'/signup'
    });
}).run(function ($rootScope, $location){
});
