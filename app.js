// app.js

var express = require('express');
var app = express();
var db = require('./db');
var api = require('./api');
// var blogRouter = require('./blog/blog-router');
// var UserController = require('./user/UserController');

app.set('views', './views');  // set views/template folder
app.set('view engine', 'pug');  // set pug for view engine
app.use(express.static('public'));  // use /public as static folder

app.use('/api', api);  // add api router

// Main pages for "projects":
// app.get('/blog', function (req, res) {
// 	res.render('blog', 
// 	{
// 		'post_title': "A post title!",
// 		'post_date': "22 February 2018, 8:24pm"
// 	});
// });
app.get('/blog', (req, res) => {

	// Show latest 3 blog posts..
	res.render('blog', api.blogRouter);

});

module.exports = app;