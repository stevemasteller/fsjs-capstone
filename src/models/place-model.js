"use strict";

/************************************************************/
/** Mongoose Place model
/************************************************************/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PlaceSchema = new Schema ({
	position: {
		lat: {
			type: Number
		},
		lng: {
			type: Number
		}
	},
	title: {
		type: String
	},
	icon: {
		url: {
			type: String
		}
	}
});


/************************************************************/
/** Export model
/************************************************************/
var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;

