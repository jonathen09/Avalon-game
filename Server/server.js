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

io.on('connection', function(socket) {
  var addedUser = false;
  console.log('connecting to io');

  //listening to any user login event
  socket.on('add-user', function(user) {
    socket.username = user;
    console.log(socket.username);
    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers:numUsers
    });

    socket.broadcast.emit('user joined', {
      //username: socket.username,
      numUsers: numUsers
    });
  });
});

//Connect to Port
server.listen(port);


console.log('Server up on ' + port);

module.exports = app;
