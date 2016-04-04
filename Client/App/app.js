angular.module('avalon', [
  'avalon.services',
  'avalon.lobby',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider){
  $routeProvider
    .when('/lobby', {
      templateUrl: 'app/lobby/lobby.html',
      controller: 'LobbyController'
    })
    .otherwise({
      redirectTo:'/lobby'
    });
}).run(function ($rootScope, $location){
});
