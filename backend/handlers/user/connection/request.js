const mongoose = require('mongoose');
const Requests = mongoose.model('request');

module.exports = async (req, res) => {
	if (!req.body.requested) {
		res.send(JSON.stringify('Invalid request id'));
	}
	Requests.findOne({
		requested: res.locals.user._id,
		requester: req.body.requested,
		confirmed: false
	}).then(request => {
		if (request) {
			request.confirmed = true;
			request.save();

			res.send(JSON.stringify('Request Confirmed!'));
			return;
		}

		Requests.create({
			requester: res.locals.user._id,
			requested: req.body.requested,
			confirmed: false
		}).then( request => {
			if (!request) {
				throw new Error('Couldn\'t create request');
			}
			
			request.save();
			res.send(JSON.stringify('Request sent.'));
		}).catch( err => {
			res.status(400);
			res.send(JSON.stringify(err));
		});
	});



};
