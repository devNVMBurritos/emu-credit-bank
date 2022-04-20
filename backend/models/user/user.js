const mongoose = require('mongoose');
const crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		unique: [true,'username is already taken'],
		required: [true, 'can\'t be blank'],
		match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, 'can\'t be blank'],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true
	},
	password: {
		type: String,
		required: true,
		set: setPassword,
		index: true
	},
	salt: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	roles: [{
		type: String,
		enum: ['game-moderator', 'customer-support', 'customer'],
		default: ['customer']
	}],
	reviews: [{
		type:mongoose.Schema.Types.ObjectId, ref: 'review'
	}],
	loginToken: {type: String, required: false},
});

function setPassword(password) {
	this.salt = crypto.randomBytes(32).toString('hex');
	return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.password === hash;
};

UserSchema.methods.generateToken = function(){
	this.loginToken = crypto.pbkdf2Sync(
		crypto.randomBytes(64), 
		crypto.randomBytes(32).toString('hex'), 10000, 512, 'sha512').toString('hex');
};

mongoose.model('user', UserSchema);
