angular.module('avalon.lobby', ['avalon.services'])

.controller('LobbyController', function($scope, $window, $location, socket) {

  //Variables in Scope
  $scope.username ='';
  $scope.lobbyUsers = [];
  $scope.usersInLobby = 0;
  $scope.gameStatus = false;

  //Base update Function
  $scope.update = function() {
    socket.emit('update');
  };

  //Listener for events
  socket.on('user joined', function (data) {
    console.log('user joined');
    $scope.usersInLobby = data.numUsers;
    $scope.lobbyUsers = data.users;
  });

  socket.on('your username', function (data) {
    $scope.username = data.username;
  });

  socket.on('server update', function (data) {
    $scope.userInLobby = data.numUsers;
    $scope.lobbyUsers = data.users;
    $scope.gameStatus = data.gameStatus;
  });

  //Functions
  $scope.changeStatus = function() {
    var user = $window.localStorage.username;
    socket.emit('statusChange');
  };

  $scope.startGame = function() {
    $location.path('/game');
  };

  //Function Calls
  $scope.update();

});

