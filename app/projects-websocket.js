// const app = require('./app');
// const config = require('../config'); // config file for varying devices
// const server = app.listen(config.PORT, config.IP); // attempting to host on LAN
// const io = require('socket.io').listen(server);

// const socketio = require('socket.io');

// function listen(app) {
// module.exports.listen = function(app) {

// io = socketio.listen(app);
// users = io.of('/users');  // what is this?

function start(server) {

	var io = require('socket.io').listen(server);

	io.on('connection', function(socket) {

		console.log("> connected to client: " + socket.id);

		socket.on('error', function (err) {
			console.log('> socket error: ' + err);
		});

		socket.on('disconnect', function () {
			console.log("> client " + socket.id + " disconnected");
		});

	});

}

	// return io;

// }

module.exports = start;

// module.exports = {
// 	start: start
// }