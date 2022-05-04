const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	Cost.find({confirmed: true}).or([
		{ payedFor: res.locals.user._id },
		{ payedBy: res.locals.user._id }
	]).populate('payedBy').then( costs => {
		if (!costs) {
			res.status(404);
			res.send(JSON.stringify('No costs were found'));

			return;
		}
		let balance = 0;

		costs.forEach( cost => {
			if (cost.payedFor.findIndex(x => x == res.locals.user._id) == -1)
				balance -= cost.cost / cost.payedFor.length || 1;

			if (cost.payedBy._id.toString() == res.locals.user._id.toString()) {
				
				balance += cost.cost;
			}
		});

		res.send(JSON.stringify(balance));
	});
};
