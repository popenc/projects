// example of a brew instance that is instantiated
// by the frontend:


var brew_obj = new {
	tag: "DIPA-155-60_2015-20-07", // unique brew id (if varying mash temp: DIPA-155-142-60_date, etc.)
	name: "Double IPA",
	// group_id: "the-perfect-dipa", // optional unique group id if tweaking params on same beer
	description: "An attempt at honing in on a delicious DIPA that's well balanced, crisp, and robust!",
	sensors: [
		// declared and inherited sensors used from sensors collection 
	],
	brew_date: "timestamp", // date it was brewed on
	bottle_date: "timestamp", // date it was bottled
	malts: [{
		malt: "",
		amount: "",
		units: "lbs"
	}],
	hops: [{
		hop: "",
		amount: "",
		units: "oz"
	}],
	extras: [{
		ingredient: "",
		amount: "",
		units: "",
	}],
	log: [{
		date: "timestamp", // date it's tasted
		taste: "", // an attempt at taste notes and stuff
		comments: "",
	}]
};