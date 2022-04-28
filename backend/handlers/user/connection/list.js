const mongoose = require('mongoose');
const Requests = mongoose.model('request');

module.exports = async (req, res) => {
	Requests.findOne({ confirmed: true }).or([
		{ requester: res.local.user },
		{ requested: res.loca.user }
	]).populate('requester').populate('requested')
		.select(
			'requester.username',
			'requester.email',
			'requested.username',
			'requested.email'
		)
		.then( requests => {
			if (!requests) {
				throw new Error('Couldn\'t find request');
			}

			let conncetionList = [];
			requests.forEach( conncetion => {
				if (conncetion.requested.username === res.local.user.username) {
					conncetionList.push(conncetion.requester);
				} else {
					conncetionList.push(conncetion.requested);
				}
			});

			res.send(JSON.stringify(conncetionList));
		}).catch( err => {
			res.status(400);
			res.send(JSON.stringify(err));
		});
};
