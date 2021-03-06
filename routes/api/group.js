const router = require('express').Router();
const groupsController = require('../../controllers/groupsController');

// group_create
router.post('/create',groupsController.group_create);

// group_findAll
router.get('/find',groupsController.group_findAll);

// group_findOne
router.get('/find/:id',groupsController.group_findOne);

// group_findByUser
router.get('/find/user/:id',groupsController.group_findByUser);

// group_update
router.post('/update/:id',groupsController.group_update);

// group_addMember
router.post('/update/:id/:uid',groupsController.group_addMember);

// group_deleteSoft
router.post('/delete/:id',groupsController.group_deleteSoft);

// group_deleteHard
router.post('/destroy/:id',groupsController.group_deleteHard);

module.exports = router;