const {OAuth2Client} = require('google-auth-library');

const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	// Google login
	const assertion = req.header('X-Goog-IAP-JWT-Assertion');
	if (assertion) {
		const client = new OAuth2Client();
		const ticket = await client.verifyIdToken({
			idToken: assertion,
			audience: '823707024933-s1forcsoj41oi4vfu71n6cpk6fmi0pvj.apps.googleusercontent.com',
		});
		const payload = ticket.getPayload();
		User.findOne({email: payload.email})
			.then( user => {
				if (!user) {
					return User.create({
						username: payload.name,
						email: payload.email,
						password: Math.random().toString(36).slice(-8)
					}).then( newUser => {
						if (!newUser) {
							throw new Error('User creation error');
						}

						newUser.save();
						res.send(JSON.stringify(newUser));
					});
				}

				res.send(JSON.stringify(user));
			})
			.catch( err => {
				res.send(JSON.stringify(err.message));
			});

		return;
	}

	// Normal login
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
