const mongoose = require('mongoose');
const Requests = mongoose.model('request');

module.exports = async (req, res) => {
	if (!req.body.requester) {
		res.send(JSON.stringify('Invalid request id'));
	}

	Requests.findOne({
		requester: req.body.requester,
		requested: res.locals.user._id
	}).then( request => {
		if (!request) {
			throw new Error('Couldn\'t find request');
		}

		request.confirmed = true;
		request.save();
		res.send(JSON.stringify('Request confirmed.'));
	}).catch( err => {
		res.status(400);
		res.send(JSON.stringify(err));
	});
};
