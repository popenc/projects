// UserController.js

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var blog = require('./blog-model');

// Create a User
router.post('/', (req, res) => {

	blog.create({
		title: req.body.title,
		author: req.body.author,
		body: req.body.content,
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
			return res.status(500).send("There was a problem adding the information to the database.");
		}
		else {
			res.status(200).send(blogData);
		}
	});

});

// Return all Users in DB
router.get('/', (req, res) => {

	blog.find({}, (err, blog_data) => {
		if (err) {
			return res.status(500).send("There was a problem finding the users.");
		}
		
		res.status(200).send(blog_data);

	});

});

// // Return a single user from DB
// router.get('/:id', (req, res) => {

// 	User.findById(req.params.id, (err, user) => {

// 		if (err) {
// 			return res.status(500).send("There was a problem finding the user.");
// 		}

// 		if (!user) {
// 			return res.status(404).send("No user found.");
// 		}

// 		res.status(200).send(user);

// 	});

// });

// // Deletes a user from the DB
// router.delete('/:id', (req, res) => {

// 	User.findByIdAndRemove(req.params.id, (err, user) => {

// 		if (err) {
// 			return res.status(500).send("There was a problem deleting the user.");
// 		}

// 		res.status(200).send("User " + user.name + " was deleted.");

// 	});

// });

// // Update a single user in the DB
// router.put('/:id', (req, res) => {

// 	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {

// 		if (err) {
// 			return res.status(500).send("There was a problem updating the user.");
// 		}

// 		res.status(200).send(user);

// 	});

// });

module.exports = router;