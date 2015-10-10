// TODO: inherit sensor.js schema; each tempeh
// instance will have a field for sensors used,
// where sensors is an actual mongo object

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tempehSchema = new Schema({
	tag: { type: String, required: true, unique: true }, // unique tempeh id, e.g., 001 (batch one)
	name: { type: String, required: true }, // e.g., tradiational tempeh; rye, buckwheat tempeh
	description: { type: String, required: true }, // 
	sensors: [
		// declared and inherited sensors used from sensors collection
		// TODO: inherit sensor objects (e.g., sensor01.js)
	],
	start_date: { type: Date, required: true }, // date it was tempehed on
	end_date: { type: Date, required: false }, // date it was bottled
	ingredients: [{
		ingredient: { type: String, required: false },
		amount: { type: String, required: false },
		units: { type: String, required: false },
	}],
	comments: [{
		date: { type: Date, required: false },
		comment: { type: String, required: false }
	}],
	process: { type: String, required: false } // the method for the batch
});

// add a custom method to tempehSchema:
// tempehSchema.methods.dudify = function() {
//   this.name = this.name + '-dude'; 
//   return this.name;
// };

// create model
var Tempeh = mongoose.model('Tempeh', tempehSchema);

// make this available to our users in our Node applications
module.exports = Tempeh;