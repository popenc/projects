// schema for a brew run!

// TODO: inherit sensor.js schema; each brew
// instance will have a field for sensors used,
// where sensors is an actual mongo object

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var brewSchema = new Schema({
	tag: { type: String, required: true, unique: true }, // unique brew id (if varying mash temp: DIPA-155-142-60_date, etc.)
	name: { type: String, required: true },
	// group_id: "the-perfect-dipa", // optional unique group id if tweaking params on same beer
	description: { type: String, required: true },
	sensors: [
		// declared and inherited sensors used from sensors collection
		// TODO: inherit sensor objects (e.g., sensor01.js)
	],
	brew_date: { type: Date, required: true }, // date it was brewed on
	bottle_date: { type: Date, required: false }, // date it was bottled
	malts: [{
		malt: { type: String, required: false },
		amount: { type: String, required: false },
		units: { type: String, required: false }
	}],
	hops: [{
		hop: { type: String, required: false },
		amount: { type: String, required: false },
		units: { type: String, required: false }
	}],
	extras: [{
		ingredient: { type: String, required: false },
		amount: { type: String, required: false },
		units: { type: String, required: false },
	}],
	log: [{
		date: { type: Date, required: false }, // date it's tasted
		taste: { type: String, required: false }, // an attempt at taste notes and stuff
		comments: { type: String, required: false },
	}]
});

// add a custom method to brewSchema:
// brewSchema.methods.dudify = function() {
//   this.name = this.name + '-dude'; 
//   return this.name;
// };

// create model
var Brew = mongoose.model('Brew', brewSchema);

// make this available to our users in our Node applications
module.exports = Brew;