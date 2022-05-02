const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	if (!req.body.costId) {
		res.status(400);
		res.send('CostId is not set');
	}

	Cost.findById(req.body.costId)
		.then( cost => {
			if (!cost) {
				throw new Error('Cost Not Found!');
			}

			if (cost.confirmedBy.findIndex(x => x == res.locals.user._id) == -1)
				cost.confirmedBy.push(res.locals.user._id);
			
			if (cost.confirmedBy == cost.payedFor)
				cost.confirmed = true;
			
			cost.save();
			res.send(JSON.stringify('Cost is updated!'));
		})
		.catch( err => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		});
};
