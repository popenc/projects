// blog-controller.js

/*
The logic for DB interactions for the blog feature.
*/


// Requirements..
const
	blog = require('../models/blog-model');


// Blog logic for talking to DB..
var blogController = {

	// Create a blog post document..
	create: (blogData) => {
		return new Promise((resolve, reject) => {
			console.log("Saving blog post to DB..");
			blog.create({
				title: blogData.title,
				author: blogData.author,
				body: blogData.content,
				comments: [{ body: "arg this is bad", date: Date() }],
				date: Date(),
				keywords: ["first post", "testing"],
				meta: {
					votes: 0,
					views: 0,
				}		
			},
			(err, blogData) => {
				if (err) {
					console.log(err);
					reject("There was a problem adding blog post to DB..");
				}
				else {
					resolve(blogData);
				}
			});
		});
	},

	readAll: () => {
		return new Promise(function(resolve, reject) {
			console.log("Getting blog posts from DB..");
			blog.find({}, (err, blogData) => {
				if (err) {
					reject("Error reading blog posts from DB..");
				}
				resolve(blogData);
			});
		});	
	},

	// Return posts by filter (e.g., date or date range, keyword(s) match)..
	read: (filter) => {

	}

};



// Export blog controller module..
module.exports = blogController;