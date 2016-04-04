var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');

var app = express();

var port = 8080;

mongoose.connect('mongodb://localhost/avalon');

app.use(express.static(__dirname + '/../Client'));

//require('./config/routes.js')(app, express);

app.listen(port);

console.log('Server up on ' + port);

module.exports = app;
