

function startWebSocketServer(server) {

	var io = require('socket.io')(server);
	var chatObj = {
		username: '',
		message: ''
	};

	io.on('connection', function(socket) {

		console.log("> connected to client: " + socket.id);

		socket.on('error', function (err) {
			console.log('> socket error: ' + err);
		});

		socket.on('disconnect', function () {
			console.log("> client " + socket.id + " disconnected");
		});

		socket.on('chat message', function(msg) {
			console.log("message: " + msg);

			chatObj.username = socket.id;
			chatObj.message = msg;

			// io.emit('chat message', msg);
			io.emit('chat message', JSON.stringify(chatObj));
		});

	});

}



module.exports = startWebSocketServer;