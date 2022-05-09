const mongoose = require('mongoose');
const User = mongoose.model('user');

var CostSchema = new mongoose.Schema({
	payedFor: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
		}],
		validate: [arrayMin, 'You need to give at least one user that the cost was payed for!']
	},
	payedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	},
	cost: {
		type: Number,
		required: true
	},
	confirmedBy: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	}],
	confirmed: {
		type: Boolean
	},
});

function arrayMin(val) {
	return val.length > 0;
}

mongoose.model('cost', CostSchema);
