// UserController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// var User = require('./User');
var User = require('../models/user-model');

// Create a User
router.post('/', (req, res) => {

	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	},
	(err, user) => {
		if (err) {
			return res.status(500).send("There was a problem adding the information to the database.");
		}
		else {
			res.status(200).send(user);
		}
	});

});

// Return all Users in DB
router.get('/', (req, res) => {

	User.find({}, (err, users) => {
		if (err) {
			return res.status(500).send("There was a problem finding the users.");
		}
		
		res.status(200).send(users);

	});

});

// Return a single user from DB
router.get('/:id', (req, res) => {

	User.findById(req.params.id, (err, user) => {

		if (err) {
			return res.status(500).send("There was a problem finding the user.");
		}

		if (!user) {
			return res.status(404).send("No user found.");
		}

		res.status(200).send(user);

	});

});

// Deletes a user from the DB
router.delete('/:id', (req, res) => {

	User.findByIdAndRemove(req.params.id, (err, user) => {

		if (err) {
			return res.status(500).send("There was a problem deleting the user.");
		}

		res.status(200).send("User " + user.name + " was deleted.");

	});

});

// Update a single user in the DB
router.put('/:id', (req, res) => {

	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {

		if (err) {
			return res.status(500).send("There was a problem updating the user.");
		}

		res.status(200).send(user);

	});

});

module.exports = router;