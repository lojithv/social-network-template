var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	text: String,
	author: String,
	type: String,
	created_at: Date,
	updated_at: Date
});

postSchema.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if (!this.created_at) {
		this.created_at = currentDate;
	}

	next();
})

module.exports = mongoose.model('Post', postSchema);