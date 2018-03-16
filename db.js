// db.js

var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/sensors', function (err) {
	if (err) {
		console.log("mongodb error: " + err);
		return;
	}
});

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function (err) {
	console.log("database is open!");
});