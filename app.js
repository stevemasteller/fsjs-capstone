"use strict";

var express  = require('express');
var path     = require('path');
var bodyParser = require("body-parser");	
var morgan = require('morgan');					// for logging http activity to console
var mongoose = require('mongoose');
var seeder   = require('mongoose-seeder');		// for loading database at startup
var seedData = require('./src/data/data.json');	// database initialization data

// routes
var users = require('./src/routes/users');
var place = require('./src/routes/place');

var app = express();

/*********************************/
/** Connect to database
/*********************************/
// mongoose models
require("./src//models/user-model");
require("./src//models/place-model");

// sets up a database connection
mongoose.connect('mongodb://localhost:27017/db');

var db = mongoose.connection;

// write a message to console on error
db.on("error", function(err) {
	console.error("db connection error", err);
});

// seed the data base
db.once("open", function() {
	seeder.seed(seedData)
	.catch(function (err) {
		if (err) {
			console.log(err);
		}
	});
	

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
app.get('/vendor/angular-simple-logger.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-simple-logger', 'dist', 'angular-simple-logger.min.js'));
});
app.get('/vendor/angular-google-maps.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-google-maps', 'dist', 'angular-google-maps.min.js'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', users);
app.use('/api/place', place);


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