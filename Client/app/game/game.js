angular.module('avalon.game', ['avalon.services'])

.controller('GameController', function($scope, $window, $location, socket) {
$scope.username ='';
$scope.cards = [];
$scope.side ='';
$scope.role ='';
$scope.information ='';
$scope.start = '';
$scope.captain = '';
$scope.captainButton = false;
$scope.votingButton = false;
$scope.voteResultShow = false;
$scope.voteResult = '';
$scope.picked =[];
$scope.onMission= false;
$scope.missionResultShow = false;

//Information that must be stored
$scope.bad =[];
$scope.percival =[];



//Inits
socket.emit('getUsername');
socket.on('username', function(data) {
  $scope.username = data.username;
});
socket.emit('getCards');

//User Identifiers
$scope.badIdentifier = ["morgana","assassin","modred"];
$scope.merlinIdentifier = ["morgana","assassin","bad"];
$scope.percivalIdentifier = ["morgana","merlin"];

//Functions
$scope.callVote = function() {
  socket.emit('team vote call');
};

$scope.closeVote = function() {
  socket.emit('close vote');
};

$scope.addToTeam = function(player) {
  if($scope.captainButton) {
    if (!$scope.picked.includes(player[0])){
      $scope.picked.push(player[0]);
      socket.emit('pick player',$scope.picked);
    }
  }
};

$scope.removeFromTeam = function(player) {
  if($scope.captainButton) {
    var index = $scope.picked.indexOf(player);
    $scope.picked.splice(index,1);
    socket.emit('pick player',$scope.picked);
  }
};

socket.on('player picked', function(data) {
  console.log('receiving');
  $scope.picked = data;
});

$scope.isCaptain = function() {
  if ($scope.username === $scope.captain) {
   $scope.captainButton = true;
  }
};

$scope.accept = function() {
  socket.emit('vote', 1);
  $scope.votingButton = false;
};

$scope.decline = function() {
  socket.emit('vote', -1);
  $scope.votingButton = false;
};

$scope.approve = function() {
  socket.emit('approve');
  $scope.onMission = false;
};

$scope.sabotage = function() {
  socket.emit('sabotage');
  $scope.onMission = false;
};

socket.on('mission result', function(data) {
  $scope.missionResultShow = true;
  if (data) {
    $scope.missionResult = "SUCCESSSSS!!!!!!!";
  } else {
    $scope.missionResult = "FAILED NUUUUUUUU!";
  }
});

socket.on('passed', function(onMission) {
  $scope.voteResult = "Passed...Now Voting";
  $scope.voteResultShow = true;
  if(onMission.includes($scope.username)) {
    $scope.onMission = true;
  }
});

socket.on('failed', function() {
  $scope.voteResult = "Failed...New Captain time";
  $scope.voteResultShow = true;
  //flesh out how to make a new captain

});

socket.on('turn on voting', function(){
  $scope.votingButton = true;
});


socket.on('cards', function(data) {
  $scope.cards = data.card; //Grabs the cards
  $scope.start = data.start;
  $scope.captain = $scope.cards[$scope.start][0];
  //Find the current User
  var bad = [];
  var percival = [];
  for (var i = 0; i < $scope.cards.length; i++) {
    if ($scope.cards[i][0] === $scope.username) {
      $scope.role = $scope.cards[i][1];
    }
    if ($scope.cards[i][1] === "morgana" || $scope.cards[i][1] === "assassin" || $scope.cards[i][1] === "bad") {
      bad.push($scope.cards[i][0]);
    }
    if ($scope.cards[i][1] === "morgana" || $scope.cards[i][1] === "merlin") {
      percival.push($scope.cards[i][0]);
    }
  }
  $scope.bad = bad;
  $scope.percival = percival;
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

  if ($scope.role === "percival") {
    $scope.information = "One is merlin one is Morgana: " + $scope.percival;
  }

  if ($scope.role === "merlin") {
    $scope.information = "These guys are bad:" + $scope.bad;
  }

  if ($scope.role === "good") {
    $scope.information = "Don't be Shady & MO IS ALWAYS BAD";
  }

$scope.isCaptain();
});



});
