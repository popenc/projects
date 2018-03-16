var router = require('express').Router();

var blogRouter = require('./blog/blog-router');

router.use('/blog', blogRouter);

module.exports = router;