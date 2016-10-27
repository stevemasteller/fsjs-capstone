"use strict";

/************************************************************/
/** Mongoose Place model
/************************************************************/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PlaceSchema = new Schema ({
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	}
});


/************************************************************/
/** Export model
/************************************************************/
var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;

