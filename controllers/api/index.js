const router = require('express').Router();
// Routes in here are the ones in the api folder
const userRoutes = require('./user-Routes');
const blogRoutes = require('./blog-Routes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;