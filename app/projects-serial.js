var sp = require("serialport");
var SerialPort = sp.SerialPort;
var serial_data = "";

try {
	var serial = new SerialPort("COM4", {
		baudrate: 9600, 
		parser: sp.parsers.readline("\n")
	});

	serial.on('error', function (err) {
		console.log('> serial error: ' + err);
	});

}
catch (e) {
	console.log("error occurred when connecting to serial port");
	console.log(e);
}

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

	var upsertData = {
			"time": current_time,
			"temp": serial_data
	};

	Sensor.find({id: "S01"}, function (err, docs) {
		if (!docs.length) { 
			var sensor01 = new Sensor({
				"id": "S01",
				"name": "brewing thermometer", // general name of sensor (e.g., grill temp, oyster hum, etc.)
				"location": "kitchen", // where the sensor is (gps, kitchen, etc.)
				"application": "water and mash temperature", // what the sensor is used for
			});
			sensor01.save(function (err) {
				if (err) console.log("error saving : " + err);
			});
		}
		else {
			console.log("they docs: " + docs);
			db.collection('sensors').update({id: "S01"}, {$push: {"data.values": upsertData}}, {upsert: true, safe: true}, 
				function (err, doc) {
					if (err) return console.log("db update err: " + err);
					console.log("saved");
				}
			);
		}
	});
	

	console.log("-----------------");
	console.log(JSON.stringify(jsonData));

	socket.emit('data', jsonData); // send data to client

});

module.exports = projects_serialport;