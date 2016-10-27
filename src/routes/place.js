"use strict";

/************************************************************/
/** /api/place routes
/************************************************************/
var express = require("express");
var createError = require('http-errors');
var router = express.Router();

// mongoose model
var User = require("../models/user-model");
var Place = require("../models/place-model");

var validationErrors = require("./validationErrors");
var authorization = require("../middleware/authorization");

/************************************************************/
/** /api/place
/************************************************************/
// Gets all markers
router.get("/", function(req, res, next) {
	
	Place.find({}, function(err, places) {
	
		if (err) return next(err);
		
		if (!places) {
			return next(createError(404, "No places found"));
		} else {
		
			console.log('reached /api/place/get');
			
			// format data for output
			var body = {};
			body = places;
			res.json(body);
		}
	});
});

// Places a marker and returns no content.
router.post("/home", function(req, res, next) {
	console.log('reached api/place/home');	
	
	// create a new place
	var place = new Place(req.body);
	
	// save the new place
	place.save( function(err) {
		console.log('save home');
		if (err) return next(err);

		// return response
		res.status(201);
		res.end();
	});
});


/************************************************************/
/** Export routes
/************************************************************/
module.exports = router;