var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Configurations
var port = 8080;

mongoose.connect('mongodb://localhost/avalon');

app.use(express.static(__dirname + '/../Client'));
//Serve Static HTML

//Server Data -> add to mongoose later
var numUsers = 0;
var users = [];
var readyUsers = 0;

io.on('connection', function(socket) {
  var addedUser = false;
  console.log('connecting to io');

  socket.on('update', function() {
    io.sockets.emit('server update', {
      numUsers: numUsers,
      users: users
    });
  });

  socket.on('statusChange', function() {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === socket.username) {
        if (users[i].status === "ready") {
          users[i].status = "not ready";
          --readyUsers;
        } else {
          users[i].status = "ready";
          ++readyUsers;
        }
      }
    }
    //Check Game Status
    var status = false;
    if (readyUsers >= 6) {
      status = true;
    }
    io.sockets.emit('server update', {
      numUsers: numUsers,
      users: users,
      gameStatus: status
    });
  });

  //listening to any user login event
  socket.on('add-user', function(user) {
    users.push(user);
    socket.username = user.username;
    numUsers++;
    addedUser = true;
    //Send back data to everyone else
    io.sockets.emit('user joined', {
      numUsers: numUsers,
      users: users
    });
    socket.emit('your username', {
      username: socket.username
    });
  });

  socket.on('trigger start', function() {
    io.sockets.emit('game started');
  });










});

//Connect to Port
server.listen(port);


console.log('Server up on ' + port);

module.exports = app;
