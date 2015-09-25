// if our user.js file is at app/models/user.js
var User = require('./user');

var Sensor = require('./models/sensor'); // get Sensor schema

var brew_sensor = new Sensor({
	name: "brew sensor", // general name of sensor (e.g., grill temp, oyster hum, etc.)
	location: "kitchen", // where the sensor is (gps, kitchen, etc.)
	application: "measuring brew temperature during multiple stages", // what the sensor is used for
	// data: {
	// 	values: [[String, Number]], // list of timestamp,value pairs for plotting
	// 	units: String, // units of measurement (e.g., degF)
	// 	triggers: [{
	// 		time: String,
	// 		trigger: String // any notable events with timestamp ('event' already taken)
	// 	}]
	// }
	// meta: {
	// 	description: String,
	// 	created: String,
	// 	sensor_id: String, // sensor's part number (e.g., LM335)
	// 	datasheet: String // link to datasheet, or actual datasheet (depends on memory)
	// }
});

console.log(brew_sensor);


// console.log(User);
  
// create a new user called chris
// var chris = new User({
//   name: 'Chris',
//   username: 'sevilayha',
//   password: 'password' 
// });


// // call the custom method. this will just add -dude to his name
// // user will now be Chris-dude
// chris.dudify();
// console.log(chris.name);

// // call the built-in save method to save to the database
// chris.save();
