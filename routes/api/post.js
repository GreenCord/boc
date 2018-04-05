const router = require('express').Router();
const postsController = require('../../controllers/postsController');

//post_create
router.post('/create',postsController.post_create);

module.exports = router;