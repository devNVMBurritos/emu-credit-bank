const mongoose = require('mongoose');
const Requests = mongoose.model('request');

module.exports = async (req, res) => {
	Requests.find().populate('requester').populate('requested')
		.then( data => {
			res.send(JSON.stringify(data));
		});/* .or([
		{ requester: res.locals.user },
		{ requested: res.locals.user }
	])
		.select([
			'requester.username',
			'requester.email',
			'requested.username',
			'requested.email'
		])
		.then( requests => {
			if (!requests) {
				throw new Error('Couldn\'t find request');
			}

			let conncetionList = [];
			requests.forEach( conncetion => {
				if (conncetion.requested.username === res.locals.user.username) {
					conncetionList.push(conncetion.requester);
				} else {
					conncetionList.push(conncetion.requested);
				}
			});

			res.send(JSON.stringify(conncetionList));
		}).catch( err => {
			res.status(400);
			res.send(JSON.stringify(err));
		});*/
};
