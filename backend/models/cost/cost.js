const mongoose = require('mongoose');
const User = mongoose.model('user');

var CostSchema = new mongoose.Schema({
	payedFor: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	}],
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
	}
});

mongoose.model('cost', CostSchema);
