const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	if (!req.body.payedFor) {
		res.status(400);
		res.send(JSON.stringify('costsFor field missing!'));
		
		return;
	}

	if (!req.body.payedBy) {
		res.status(400);
		res.send(JSON.stringify('payedBy field missing!'));
		
		return;
	}

	if (!req.body.cost) {
		res.status(400);
		res.send(JSON.stringify('Was it free? lol'));
		
		return;
	}

	Cost.create({
		payedFor: req.body.payedFor,
		payedBy: req.body.payedBy._id,
		confimedBy: [],
		confirmed: false,
		cost: req.body.cost
	}).then( cost => {
		if (!cost) {
			throw new Error('Could not crate cost');
		}
	}).catch( err => {
		res.status(400);
		res.send(JSON.stringify(err.message));
	});
};
