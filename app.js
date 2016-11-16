"use strict";

var express  = require('express');
var path     = require('path');
var bodyParser = require("body-parser");	
var morgan   = require('morgan');					// for logging http activity to console
var mongoose = require('mongoose');

// routes
var place = require('./src/routes/place');
var yelp  = require('./src/routes/yelp');

var app = express();

/*********************************/
/** Connect to database
/*********************************/
// mongoose model
require("./src/models/place-model");

// sets up a database connection
mongoose.connect('mongodb://localhost:27017/db');

var db = mongoose.connection;

// write a message to console on error
db.on("error", function(err) {
	console.error("db connection error", err);
});

// write a message to console on connection
db.once("open", function() {

	// write a message indication connection made.
	console.log("db connection successful");
});

/*********************************/
/** Routing
/*********************************/
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// morgan gives us http request logging
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

// vendor scripts
app.get('/vendor/lodash.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'lodash', 'lodash.js'));
});
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'));
});
app.get('/vendor/ng-map.min.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'ngmap', 'build', 'scripts', 'ng-map.min.js'));
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/place', place);
app.use('/api/yelp', yelp);


/*********************************/
/** Error handling
/*********************************/
// catch 404 
app.use(function (req, res, next) {
	next(createError(404, "Not found"));
});

// Global error handler. 
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


/*********************************/
/** Server
/*********************************/
app.listen(3000, function() {
	console.log("The server is running on PORT 3000!");
});