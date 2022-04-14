// An index file to gather the API routes and export them for use
// Dependencies
// Server connection

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Define route path for the API to use, e.g. api/users/
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
