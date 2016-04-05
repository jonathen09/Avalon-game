angular.module('avalon.lobby', ['avalon.services'])

.controller('LobbyController', function($scope, $window, socket) {
  $scope.lobbyUsers = [];
  $scope.usersInLobby = 0;

  $scope.update = function() {
    socket.emit('update');
  };

  //call update on every call
  $scope.update();

  $scope.changeStatus = function() {
    var user = $window.localStorage.username;
    socket.emit('statusChange', user);
    $scope.update();
  };

  //Listener for events
  socket.on('user joined', function (data) {
    console.log(data);
    $scope.usersInLobby = data.numUsers;
    $scope.lobbyUsers = data.users;
  });

});

