// packages
var express    = require('express'); // call express
var app        = express(); // define our app using express
var settings = require('./settings'); // config file for varying devices
var server = app.listen(settings.PORT, settings.IP); // attempting to host on LAN
var io = require('socket.io').listen(server);

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('static'));

app.get('/home', function(req, res) {
	res.render('home');
});

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


