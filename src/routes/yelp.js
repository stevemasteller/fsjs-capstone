"use strict";

/************************************************************/
/** /api/yelp routes
/************************************************************/
var express = require("express");
var createError = require('http-errors');
var router = express.Router();


/************************************************************/
/** /api/yelp
/************************************************************/
router.get("/", function(req, res, next) {
	
	console.log('reached /api/yelp');
	
//	curl -H "Authorization: Bearer RsT5OjbzRn430zqMLgV3Ia" \
//	https://api.oauth2server.com/1/me

});

/*		
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
router.post("/", function(req, res, next) {
	
	// create a new place
	var place = new Place(req.body);
	
	// save the new place
	place.save( function(err) {
		console.log('save place: ' + place);
		if (err) return next(err);

		// return response
		res.status(201);
		res.end();
	});
});

// Deletes a marker and returns no content
router.put("/", function(req, res, next) {
	console.log('reached api/delete');	
	
	// create a new place
	var selectedPlace = new Place(req.body);
	
	console.log('delete place: ' + selectedPlace);
	var lat = selectedPlace.position.lat;
	var lng = selectedPlace.position.lng;
	
	// find the marker to be deleted.
	Place.findOne({"position": {"lat": lat, "lng": lng}}, function (err, place) {
		
		if (err) return next(err);
		
		if (!place) {
			return next(createError(404, "Place not found"));
		} else {				
		
			// everything good remove the place
			Place.findOne({"position": {"lat": lat, "lng": lng}})
			.remove()
			.exec( function (err) {
				
				if (err) return next(err);
			});
			
			// send response
			res.status(204);
			res.end();		
		}
	});
});
*/
/************************************************************/
/** Export routes
/************************************************************/
module.exports = router;