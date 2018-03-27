// UserController.js

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var blog = require('../models/blog-model');
var blogController = require('../controllers/blog-controller');



// Create a blog post
router.post('/', (req, res) => {

	console.log("Creating blog post in DB..");

	var blogRequest = {
		title: req.body.title,
		keywords: req.body.keywords,
		content: req.body.content
	}

	blogController.create(blogRequest).then((blogData, err) => {
		res.status(200).send(blogData);
	});

});

// Return all posts in DB
router.get('/', (req, res) => {

	console.log("Returning blog posts from DB..");

	blogController.readAll().then((blogData) => {
		res.status(200).send(blogData);
	}).catch(function() {
		res.status(500).send("Error getting blog posts..");
	});

});



module.exports = router;