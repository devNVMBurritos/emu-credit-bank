const mongoose = require('mongoose');
const User = mongoose.model('user');

var RequestSchema = new mongoose.Schema({
	requester: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		unique: false
	},
	requested: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		unique: false
	},
	confirmed: Boolean,
});
RequestSchema.index({ requesterId: 0, requestedId: 0 }, { unique: true });

mongoose.model('request', RequestSchema);
