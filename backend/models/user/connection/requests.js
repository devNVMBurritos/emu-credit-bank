const mongoose = require('mongoose');
const User = mongoose.model('user');

var RequestSchema = new mongoose.Schema({
	requesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User
	},
	requestedId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User
	},
	confimed: Boolean,
});
RequestSchema.index({ requesterId: 1, requestedId: 1 }, { unique: true });

mongoose.model('request', RequestSchema);
