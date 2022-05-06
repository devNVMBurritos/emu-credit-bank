const mongoose = require('mongoose');
const Cost = mongoose.model('cost');

module.exports = async (req, res) => {
	Cost.find({confirmed: true}).or([
		{ payedFor: res.locals.user._id },
		{ payedBy: res.locals.user._id }
	]).populate('payedBy', ['email','username','_id'])
		.populate('payedFor', ['email','username','_id'])
		.then( costs => {
			if (!costs) {
				res.status(404);
				res.send(JSON.stringify('No costs were found'));

				return;
			}
			const ownId = res.locals.user._id.toString();
			let creditList = {};

			costs.forEach( cost => {
				// Ha én fizettem
				if (cost.payedBy._id.toString() == ownId) {
					// ők az adósok. (nekem - nekik az adósságom)
					cost.payedFor.forEach( user => {
						if (user._id.toString() != res.locals.user._id.toString()) {
							const userId = user._id.toString();
							if (!creditList[userId])
							{
								creditList[userId] = {};
								creditList[userId].user = user;
								creditList[userId].debt = 0;
							}
	
							creditList[userId].debt += cost.cost / cost.payedFor.length;
						}
					});
				} else {
					// aki kifizette annak nagyobb az adósággom
					const userId = cost.payedBy._id.toString();
					if (!creditList[userId])
					{
						creditList[userId] = {};
						creditList[userId].user = cost.payedBy;
						creditList[userId].debt = 0;
					}
					creditList[userId].debt -= cost.cost / cost.payedFor.length;
					
				}
				
			});
			res.send(JSON.stringify(creditList));
		});
};
