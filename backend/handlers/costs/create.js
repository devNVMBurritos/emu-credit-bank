const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	if (!req.body.costsFor) {
		res.status(400);
		res.send(JSON.stringify('costsFor field missing!'));
		
		return;
	}

	if (!req.body.payedBy) {
		res.status(400);
		res.send(JSON.stringify('payedBy field missing!'));
		
		return;
	}

	Cost.create({
		costsFor: req.body.costsFor,
		payledBy: req.body.payedBy,
		confimedBy: [],
		confirmed: false
	}).then( cost => {
		if (!cost) {
			throw new Error('Could not crate cost');
		}
	});
};
