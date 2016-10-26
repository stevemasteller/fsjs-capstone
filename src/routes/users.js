"use strict";

/************************************************************/
/** /api/users routes
/************************************************************/
var express = require("express");
var createError = require('http-errors');
var router = express.Router();

// mongoose model
var User = require("../models/user-model");

var validationErrors = require("./validationErrors");
var authorization = require("../middleware/authorization");

/************************************************************/
/** /api/users
/************************************************************/
// Returns the currently authenticated user.
router.get("/", authorization, function(req, res, next) {
	
	// create a new user
	var user = {};
	
	// format for output
	user.data = [];
	user.data.push(req.user);
	
	//output response
	res.json(user);
});

// Creates a user and returns no content.
router.post("/", function(req, res, next) {
	console.log('reached api/users/post ' + req.body.name);
	
	// create a new user
	var registerUser = new User();
	
	// avoid assigning undefined values
	if (req.body.name) {
		registerUser.name = req.body.name;
	}
	
	if (req.body.emailAddress) {
		registerUser.emailAddress = req.body.emailAddress;
	}
	
	if (req.body.password) {
		registerUser.password = req.body.password;
	}
	
	if (req.body.confirmPassword) {
		registerUser.confirmPassword = req.body.confirmPassword;
	}
	
	// save the new user
	console.log(registerUser);
	registerUser.save( function (err) {
		
		// check for validation errors
		if (err) return validationErrors(err, res, next);
		
		// output response
		res.status(201);
		res.end();
	});
});


/************************************************************/
/** Export routes
/************************************************************/
module.exports = router;