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

io.on('connection', function(socket) {
  var addedUser = false;
  console.log('connecting to io');

  socket.on('update', function() {
    socket.emit('user joined', {
      numUsers: numUsers,
      users: users
    });
  });

  socket.on('statusChange', function(data) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === data) {
        users[i].status = "ready";
      }
    }
  });

  //listening to any user login event
  socket.on('add-user', function(user) {
    console.log('user added');
    users.push(user);
    socket.username = user.username;
    numUsers++;
    addedUser = true;

    //Send back data to everyone else
    socket.emit('user joined', {
      numUsers: numUsers,
      users: users
    });
  });

});

//Connect to Port
server.listen(port);


console.log('Server up on ' + port);

module.exports = app;
