const
	config = require('./config'),
	app = require('./app/app'),
	http = require('http'),
	server = http.createServer(app),
	// server = app.listen(config.PORT, config.IP),
	io = require('./app/projects-websocket')(server);

server.listen(config.PORT, config.IP);

console.log('> hosting at ' + config.IP);
console.log('> listening on port ' + config.PORT);