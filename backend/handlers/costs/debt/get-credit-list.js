const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	Cost.find().or([
		{ payedFor: res.locals.user._id },
		{ payedBy: res.locals.user._id }
	]).populate('payedBy').then( costs => {
		if (!costs) {
			res.status(404);
			res.send(JSON.stringify('No costs were found'));

			return;
		}
		let creditList = [];

		costs.forEach( cost => {
			// Ha Én fizetek
			if (cost.payedBy._id.toSting() == res.locals.user._id.toSting()) {
				// Minden embernek kevesebbel tartozom
				cost.payedFor.forEach( debptor => {
					const id = debptor._id.toSting();
					creditList[id].user = debptor;
					if (creditList[id].debt) {
						creditList[id].debt -= cost.cost / cost.payedFor.length;
					} else {
						creditList[id].debt = cost.cost / cost.payedFor.length;
					}
				});
			} else {
				// Ha nem én fizettem
				// Minden embernek többel tartozom
				const id = res.locals.user._id.toSting();
				if (creditList[id] && creditList[id].user) {
					creditList[id].debt += cost.cost / cost.payedFor.length;
				} else {
					creditList[id].user = cost.payedBy;
					creditList[id].debt = cost.cost / cost.payedFor.length;
				}
			}
		});

		res.send(JSON.stringify(creditList));
	});
};
