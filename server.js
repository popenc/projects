const
	config = require('./config'),
	app = require('./app/app'),
	server = app.listen(config.PORT, config.IP),
	io = require('./app/projects-websocket');
	// io = require('socket.io').listen(server),
	// ws = require('./app/projects-websocket')(io);
	// ws = require('./app/websockets')(server);

// io.start();  // startup websocket connection

console.log('> hosting at ' + config.IP);
console.log('> listening on port ' + config.PORT);