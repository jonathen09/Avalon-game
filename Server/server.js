var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Configurations
var port = 8080;

mongoose.connect('mongodb://localhost/avalon');

//Serve Static HTML
app.use(express.static(__dirname + '/../Client'));

//require('./config/routes.js')(app, express);

//Connect to Port
app.listen(port);


console.log('Server up on ' + port);

module.exports = app;
