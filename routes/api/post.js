const router = require('express').Router();
const postsController = require('../../controllers/postsController');

//post_create
router.post('/create',postsController.post_create);

//post_find
router.get('/find/:id',postsController.post_find);

module.exports = router;