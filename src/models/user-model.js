"use strict";

/************************************************************/
/** Mongoose User model
/************************************************************/
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");		// for hashing password

var Schema = mongoose.Schema;
var UserSchema = new Schema ({
	name: {
		type: String
	},
	emailAddress: {
		type: String
	},
	hashedPassword: {
		type: String,
		
		// Fires if both password and confirm password absent
		required: [true, "A password is required."],
		validate: {
			validator: function() {
				// Password and comfirm password must match.
				// Fires if only confirmPassword is absent.
				if (this._confirmPassword === this._password) {
					return true;
				} else {
					return false;
				}
			},
			message: "The confirmation password and password must match."
		}
	}
});


/************************************************************/
/** Temporary password used for verification and to calculate
/** hashedPassword
/************************************************************/
UserSchema.virtual('password').get( function () {
	return this._password;
});

UserSchema.virtual('password').set( function (password) {
	console.log('password: ' + password);
				
	this._password = password;
	var salt = bcrypt.genSaltSync(10);			// generate salt 10 rounds
	var hash = bcrypt.hashSync(password, salt);	// hash password
	this.hashedPassword = hash; 
}); 


/************************************************************/
/** Temporary confirmPassword used for verification.
/************************************************************/
UserSchema.virtual('confirmPassword').get( function () {
	return this._confirmPassword;
});

UserSchema.virtual('confirmPassword').set( function (confirmPassword) {
	this._confirmPassword = confirmPassword;
});


/************************************************************/
/** Export model
/************************************************************/
var User = mongoose.model('User', UserSchema);

module.exports = User;

