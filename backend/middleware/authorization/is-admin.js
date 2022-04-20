// const { application } = require('express');
// const mongoose = require('mongoose');
// const User = mongoose.model('user');

module.exports = function (req, res, next) {
	if (res.locals.user.isAdmin) {
		next();
		return;
	}
	res.sendJSON.stringify(('Unauthorized access!'));
	return;
};
