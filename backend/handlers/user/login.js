const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (!req.body.username) {
		res.status(400);
		res.send(JSON.stringify('username was not provided!'));
		return;
	}

	if (!req.body.password) {
		res.status(400);
		res.send(JSON.stringify('password was not provided!'));
	}

	User.findOne({ username : req.body.username	})
		.then((user) => {
			if (!user ) {
				let error = new Error('User was not found!');
				error.responseStatus = 404;
				throw error;
			}
			if (!user.validPassword(req.body.password)) {
				let error = new Error('Invalid Password!');
				error.responseStatus = 400;
				throw error;
			}

			user.generateToken();
			user.save();

			res.send(JSON.stringify(user));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
