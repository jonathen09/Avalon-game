angular.module('avalon.lobby', ['avalon.services'])

.controller('LobbyController', function($scope) {
  $scope.lobby = [{username:"Jonathen",status:"Not Ready"}, {username:"Michelle",status:"Not Ready"}];

});

