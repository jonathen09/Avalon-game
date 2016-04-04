var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');

var app = express();

mongoose.connect('mongodb://localhost/avalon');

app.listen(8080);

module.exports = app;
