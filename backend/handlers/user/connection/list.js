const mongoose = require('mongoose');
const Requests = mongoose.model('request');

module.exports = async (req, res) => {
	Requests.find().or([
		{ requester: res.locals.user },
		{ requested: res.locals.user }
	]).populate('requester', ['username', 'email']).populate('requested', ['username', 'email'] )
		.then( data => {
			res.send(JSON.stringify(data));
		});
};
