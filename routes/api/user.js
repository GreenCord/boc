const router = require('express').Router();
const usersController = require('../../controllers/usersController');


// user_create
router.post('/create',usersController.user_create);

// user_findAll
router.get('/find',usersController.user_findAll);

// user_findOne
router.get('/find/:id',usersController.user_findOne);

// user_update
router.post('/update/:id',usersController.user_update);

// user_deleteSoft
router.post('/delete/:id',usersController.user_deleteSoft);

// user_deleteHard
router.post('/destroy/:id',usersController.user_deleteHard);

module.exports = router;