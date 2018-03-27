// index.js

const router = require('express').Router();

// Importing API modules:
const
	blogRouter = require('./blog-api'),
	userRouter = require('./user-api');

// Declaring URL paths for API modules:
router.use('/blog', blogRouter);
router.use('/user', userRouter);

module.exports = router;