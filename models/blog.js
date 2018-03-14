var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Blog Schema
var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		views: Number
	}
});

var Blog = mongoose.model('Blog', blogSchema);  // create model

module.exports = Blog;  // make importable