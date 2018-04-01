// app.js


// Requirements..
const
	express = require('express'),
	app = express(),
	db = require('./db'),
	api = require('./api'),
	path = require('path');
	// blogController = require('./controllers');  // TODO: Get this working
	blogController = require('./controllers/blog-controller');



// Server settings..
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');  // set pug for view engine
app.use(express.static('public'));  // use /public as static folder
app.use(express.static('dist'));



// API routes..
app.use('/api', api);



// Views routes..
app
	.get('/', (req, res) => {
		res.render('landing');
	})
	.get('/blog', (req, res) => {
		// Display public blog landing page..
		blogController.readAll().then(function(blogData) {
			console.log("blog data: " + blogData);
			res.render('blog', {'posts': blogData});
		}).catch(function() {
			res.status(500).send("Error displaying blog page..");
		});
	})
	.get('/blog/edit', (req, res) => {
		// Display page to create a blog post (admin only)..
		res.render('blog-edit');
	})
	.get('/chat', (req, res) => {
		res.render('chat');
	})
	.get('/climbing', (req, res) => {
		res.render('climbing');
	})
	.get('/projects', (req, res) => {
		res.render('projects');
	});


// Export module..
module.exports = app;