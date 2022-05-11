const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (req.body.username === null || req.body.username === undefined) {
		res.status(400);
		res.send(JSON.stringify('Username required'));
	}

	User.find({}).or([
		{ username: { $regex: '.*' + req.body.username + '.*'}},
		{ email: { $regex: '.*' + req.body.username + '.*'}}
	]).select(
		['username', 'email']
	).then( users => {
		res.send(JSON.stringify(users));
	}).catch( err => {
		res.status(400);
		res.send(JSON.stringify(err));
	});
};
