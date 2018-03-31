const router = require('express').Router();
const userRoutes = require('./user');
const groupRoutes = require('./group');

router.use('/user', userRoutes);
router.use('/group', groupRoutes);

module.exports = router;