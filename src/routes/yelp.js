"use strict";

/************************************************************/
/** /api/yelp routes
/************************************************************/
var express = require("express");
var createError = require('http-errors');
var router = express.Router();
var request = require('request');

var Place = require("../models/place-model");

/************************************************************/
/** /api/yelp
/************************************************************/
router.get("/", function(req, res, next) {

		var title = req.param('title');
		var lat = req.param('lat');
		var lng = req.param('lng');
	
	    var url = 'https://api.yelp.com/v3/businesses/search?term=' 
			+ title 
			+ '&latitude=' + lat 
			+ '&longitude=' + lng 
			+ '&radius=10';
		
		var authorization = {
			'auth': {
				'bearer': 'Xn6rcZrQTdEmV5JFNsTcnot78sESXc7P0-tbBFID8filvrfm49eXACastEejl1avhdE_SgVW0sgosL3gtGF-kMMoGgiiNoBnI0rj7CfPuS-z2B6Cxvqr7lRheUUeWHYx'
			}
		};

	try {
		
		request( url, authorization, function (err, response, body) {
				
			if (err) return next(err);
			
			console.log(body) // Show the response from yelp. 
			res.status(200);
			res.send(body);
		});
	} catch (e) {
		console.log('entering the catch block' + e);
	}
});

/************************************************************/
/** Export routes
/************************************************************/
module.exports = router;