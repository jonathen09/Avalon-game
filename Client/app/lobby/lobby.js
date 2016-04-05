angular.module('avalon.lobby', ['avalon.services'])

.controller('LobbyController', function($scope, socket) {
  $scope.lobby = [{username:"Jonathen",status:"Not Ready"}, {username:"Michelle",status:"Not Ready"}];
  $scope.usersInLobby = 0;
  socket.on('login', function (data) {
    console.log(data);
    $scope.usersInLobby = data.numUsers;
  });

});

