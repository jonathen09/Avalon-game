angular.module('avalon.signup',['avalon.services'])

.controller('SignupController', function($scope, $window, $location, socket) {
  $scope.user = {};
  $scope.user.status = "not ready";
  $scope.signUp = function() {
    //sending signal to socket
    socket.emit('add-user', $scope.user);
    $window.localStorage.setItem('username',$scope.user.username);

    //redirect to lobby
    $location.path('/lobby');
  };
});
