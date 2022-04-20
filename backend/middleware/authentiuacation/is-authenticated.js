// const { application } = require('express'); 
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	let bearerToken;

	if (!authHeader) {
		res.send(JSON.stringify('No authentication token was found'));
		return;
	}
	if (authHeader.split(' ')[0] === 'Bearer') {
		bearerToken = authHeader.split(' ')[1];
	}
	User.findOne({
		loginToken: bearerToken,
	}). then( user => {
		if (!user) {
			res.send(JSON.stringify('Invalid token'));
			return;
		}

		res.locals.user = user;
		next();
	});
};
