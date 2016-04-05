angular.module('avalon.game', ['avalon.services'])

.controller('GameController', function($scope, $window, $location, socket) {
$scope.username ='';
$scope.cards = [];
$scope.side ='';
$scope.role ='';
$scope.information ='';

//Information that must be stored
$scope.bad =[];
$scope.perceival =[];


//Inits
socket.emit('getUsername');
socket.on('username', function(data) {
  $scope.username = data.username;
});
socket.emit('getCards');

//User Identifiers
$scope.badIdentifier = ["morgana","assassin","modred"];
$scope.merlinIdentifier = ["morgana","assassin","bad"];
$scope.perceivalIdentifier = ["morgana","merlin"];

socket.on('cards', function(data) {
  $scope.cards = data; //Grabs the cards
  //Find the current User
  var bad = [];
  var perceival = [];
  for (var i = 0; i < $scope.cards.length; i++) {
    if ($scope.cards[i][0] === $scope.username) {
      $scope.role = $scope.cards[i][1];
    }
    if ($scope.cards[i][1] === "morgana" || $scope.cards[i][1] === "assassin" || $scope.cards[i][1] === "bad") {
      bad.push($scope.cards[i][0]);
    }
    if ($scope.cards[i][1] === "morgana" || $scope.cards[i][1] === "merlin") {
      perceival.push($scope.cards[i][0]);
    }
  }
  $scope.bad = bad;
  $scope.perceival = perceival;
  //Identify Roles
  if ($scope.badIdentifier.includes($scope.role)) {
    $scope.side = "evil";
  } else {
    $scope.side = "good";
  }
  //Provide Information
  if ($scope.side === "evil") {
    $scope.information = "These are your teammates:" +  $scope.bad;
  }

  if ($scope.role === "perceival") {
    $scope.information = "Perceival one of these is merlin one of these is morgana" +
      $scope.perceival;
  }

  if ($scope.role === "merlin") {
    $scope.information = "Merlin these guys are bad:" + $scope.bad;
  }

  if ($scope.role === "good") {
    $scope.information = "Good Luck & MO IS ALWAYS BAD";
  }

});


});
