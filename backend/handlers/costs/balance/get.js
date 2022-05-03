const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	Cost.find().or([
		{ payedFor: res.locals.user._id },
		{ payedBy: res.locals.user._id }
	]).then( costs => {
		if (!costs) {
			res.status(404);
			res.send(JSON.stringify('No costs were found'));

			return;
		}
		let balance = 0;

		costs.forEach( cost => {
			if (cost.payedFor.findIndex(x => x == res.locals.user._id) == -1)
				balance -= cost.cost;

			if (cost.payedBy == res.locals.user._id)
				balance += res.locals.user._id;
		});

		res.send(JSON.stringify(balance));
	});
};
