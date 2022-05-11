const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	Cost.find({
		confirmed: false,
		payedFor: res.locals.user,
		confirmedBy: { '$ne': res.locals.user }
	}).populate('payedBy', ['username'])
		.then( costs => {
			if (!costs) {
				throw new Error('Costs Not Found!');
			}

			res.send(JSON.stringify(costs));
		})
		.catch( err => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		});
};
