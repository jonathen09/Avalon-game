angular.module('avalon.signup',['avalon.services'])

.controller('SignupController', function($scope, $window, $location, socket) {
  $scope.user = {};
  $scope.signUp = function() {
    //sending signal to socket
    console.log('sending this up to server via IO:', $scope.user.username);
    socket.emit('add-user', $scope.user.username);
    //redirect to lobby
    $location.path('/lobby');
  };
});
