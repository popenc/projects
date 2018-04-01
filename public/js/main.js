// External JS Requirments..
var bootstrap = require('bootstrap');

// Local JS Requirements..
var 
	blogEditor = require('./blog-edit'),
	chulaChat = require('./chula-chat');

// CSS Requirements..
require('../css/main.css');
require('../css/blog.css');
require('../css/sticky-footer.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');

blogEditor.init();
console.log('blog editor initiated..');

