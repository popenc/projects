// packages
var express = require('express'); // call express
var app = express(); // define our app using express
var settings = require('./settings'); // config file for varying devices
var server = app.listen(settings.PORT, settings.IP); // attempting to host on LAN
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var projects_obj = require('./models/projects'); // project objects

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('static'));

// +++++ URLS Below: +++++
app.get('/', function(req, res) {
	res.render('landing', {'proj_name': ''}); // load main.jade
});

app.get('/blog', function (req, res) {
	res.render('blog', 
	{
		'post_title': "A post title!",
		'post_date': "22 February 2018, 8:24pm"
	});
});

app.get('/blog/create', function (req, res) {
	res.render('blog', {'action': 'create'});
});

app.get('/favicon.ico', (req, res) => {
	res.status(204);  // send No Content status for favicon.ico
});

app.get('/:project', function (req, res) {
	var project = req.params.project;
	console.log("Project: " + project);
	res.render(project, projects_obj[project]);
});
// ++++++++++++++++++++++++


mongoose.connect('mongodb://localhost/sensors', function (err) {
// mongoose.connect('mongodb://localhost/projects', function (err) {
	if (err) {
		console.log("mongodb error: " + err);
		return;
	}
});

// var Sensor = require('./models/sensor'); // get Sensor schema
// console.log("sensor object declared");

// see if sensor exist in db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function (callback) {
	console.log("database is open!");
	console.log(callback);
});

io.on('connection', function(socket) {

	console.log("> connected to client: " + socket.id);

	// var serial_data = "";

	// try {
	// 	var sp = require("serialport");
	// 	var SerialPort = sp.SerialPort;
	// 	var serial = new SerialPort("COM4", {
	// 		baudrate: 9600, 
	// 		parser: sp.parsers.readline("\n")
	// 	});

	// 	serial.on('error', function (err) {
	// 		console.log('> serial error: ' + err);
	// 	});

	// }
	// catch (e) {
	// 	console.log("error occurred when connecting to serial port");
	// 	console.log(e);
	// }

	socket.on('error', function (err) {
		console.log('> socket error: ' + err);
	});

	socket.on('disconnect', function () {
		console.log("> client " + socket.id + " disconnected");
		// if (serial != null && serial.isOpen()) {
		// 	serial.close();
		// 	console.log("> serial port closed");
		// }
	});

	// socket.on('connection', function () {
	// 	console.log("> client " + socket.id + " connected");
	// });

	// socket.on('serial', function (start) {

	// 	console.log("> start serial event: " + start);

	// 	if (start == true && serial != null) {

	// 		console.log("> opening serial port");

	// 		serial.on('open', function () {
	// 			console.log("> serial port opened");
	// 		});

	// 		serial.on('close', function () {
	// 			console.log("> serial port closed");
	// 		});

	// 		serial.on('data', function (data) {

	// 			var current_time = getCurrentTime();
				
	// 			serial_data = data.toString();
	// 			console.log(serial_data);
	// 			var jsonData = {
	// 				'time': current_time,
	// 				'data': serial_data
	// 			};

	// 			var upsertData = {
	// 					"time": current_time,
	// 					"temp": serial_data
	// 			};

	// 			Sensor.find({id: "S01"}, function (err, docs) {
	// 				if (!docs.length) { 
	// 					var sensor01 = new Sensor({
	// 						"id": "S01",
	// 						"name": "brewing thermometer", // general name of sensor (e.g., grill temp, oyster hum, etc.)
	// 						"location": "kitchen", // where the sensor is (gps, kitchen, etc.)
	// 						"application": "water and mash temperature", // what the sensor is used for
	// 					});
	// 					sensor01.save(function (err) {
	// 						if (err) console.log("error saving : " + err);
	// 					});
	// 				}
	// 				else {
	// 					console.log("they docs: " + docs);
	// 					db.collection('sensors').update({id: "S01"}, {$push: {"data.values": upsertData}}, {upsert: true, safe: true}, 
	// 						function (err, doc) {
	// 							if (err) return console.log("db update err: " + err);
	// 							console.log("saved");
	// 						}
	// 					);
	// 				}
	// 			});
				

	// 			console.log("-----------------");
	// 			console.log(JSON.stringify(jsonData));

	// 			socket.emit('data', jsonData); // send data to client

	// 		});

	// 		socket.on('delay', function (delay) {
	// 			console.log("> data received: " + delay);
	// 			serial.write(delay + "\n"); // send delay value to arduino
	// 			console.log("> delay sent to arduino");
	// 		});

	// 	}
	// 	else {
	// 		if (serial.isOpen() ) {
	// 			serial.close();
	// 		}
	// 	}

	// });

	

	function addZero(n) {
		return (n < 10 ? '0' : '') + n;
	}


	function getCurrentTime() {
		var full_date = new Date();
		var current_time = addZero(full_date.getHours()) + ':' + 
							addZero(full_date.getMinutes()) + ':' + 
							addZero(full_date.getSeconds()) + '.' + 
							full_date.getMilliseconds();
		return current_time;
	}

});

console.log('> hosting at ' + settings.IP);
console.log('> listening on port ' + settings.PORT);