// packages
var express    = require('express'); // call express
var app        = express(); // define our app using express
var settings = require('./settings'); // config file for varying devices
var server = app.listen(settings.PORT, settings.IP); // attempting to host on LAN
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('static'));

app.get('/home', function(req, res) {
	res.render('home');
});

mongoose.connect('mongodb://localhost/sensors', function (err) {
	if (err) throw err;

	// what to do when open
	console.log("> database opened");
	var Sensor = require('./models/sensor'); // get Sensor schema
	var brew_sensor = new Sensor({
		name: "brew sensor", // general name of sensor (e.g., grill temp, oyster hum, etc.)
		location: "kitchen", // where the sensor is (gps, kitchen, etc.)
		application: "measuring brew temperature during multiple stages", // what the sensor is used for
		data: {
			values: new [], // list of timestamp,value pairs for plotting
			units: "fahrenheit", // units of measurement (e.g., degF)
			triggers: [{
				time: "",
				trigger: "" // any notable events with timestamp ('event' already taken)
			}]
		}
		// meta: {
		// 	description: String,
		// 	created: String,
		// 	sensor_id: String, // sensor's part number (e.g., LM335)
		// 	datasheet: String // link to datasheet, or actual datasheet (depends on memory)
		// }
	});
	console.log("saving " + brew_sensor + " to db");
	brew_sensor.save(function (err, brew_sensor) {
		if (err) return console.error(err);
	});
});
// var db = mongoose.connection;
// console.log(db);
// db.on('error', function(err) {
// 	console.log('mongodb error: ' + err);
// });

io.on('connection', function(socket) {

	console.log("> connected to client: " + socket.id);

	var serial_data = "";

	var sp = require("serialport");
	var SerialPort = sp.SerialPort;
	var serial = new SerialPort("COM4", {
		baudrate: 9600, 
		parser: sp.parsers.readline("\n")
	});

	serial.on('error', function (err) {
		console.log('> serial error: ' + err);
	});

	socket.on('error', function (err) {
		console.log('> socket error: ' + err);
	});

	socket.on('disconnect', function () {
		console.log("> client " + socket.id + " disconnected");
		if (serial.isOpen()) {
			serial.close();
			console.log("> serial port closed");
		}
	});

	// socket.on('connection', function () {
	// 	console.log("> client " + socket.id + " connected");
	// });

	socket.on('serial', function (start) {

		console.log("> start serial event: " + start);

		if (start == true) {

			console.log("> opening serial port");

			serial.on('open', function () {
				console.log("> serial port opened");
			});

			serial.on('close', function () {
				console.log("> serial port closed");
			});

			serial.on('data', function (data) {

				var current_time = getCurrentTime();
				
				serial_data = data.toString();
				console.log(serial_data);
				var jsonData = {
					'time': current_time,
					'data': serial_data
				};

				console.log("-----------------");
				console.log(JSON.stringify(jsonData));

				socket.emit('data', jsonData); // send data to client

			});

			socket.on('delay', function (delay) {
				console.log("> data received: " + delay);
				serial.write(delay + "\n"); // send delay value to arduino
				console.log("> delay sent to arduino");
			});

		}
		else {
			if (serial.isOpen() ) {
				serial.close();
			}
		}

	});


	

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