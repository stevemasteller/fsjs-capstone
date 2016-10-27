"use strict";

/************************************************************/
/** Mongoose Home model
/************************************************************/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var HomeSchema = new Schema ({
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	zoom: {
		type: Number
	}
});


/************************************************************/
/** Export model
/************************************************************/
var Home = mongoose.model('Home', PlaceSchema);

module.exports = Place;

