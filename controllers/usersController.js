const user = require('../models/user');

var async = require('async');

// CRUD API

// CREATE
// Create a user
exports.user_create = (req,res)=>{
	console.log('UNIMPLEMENTED: Create a user');
	console.log('User data:',req.body);

	user.create(req.body)
	.then(dbUser=>{
		console.log('User created! dbUser:',dbUser);
		return res.json(dbUser);
	})
	.catch(err=>res.json(err));

};

// READ
// Find all users
exports.user_findAll = (req,res)=>{
	console.log('UNIMPLEMENTED: Find all users');
};

// Find one user
exports.user_findOne = (req,res)=>{
	console.log('Find one user - ',req.params.id);

	user.findOne({auth0_id: req.params.id})
	.then(dbUser=>{
		console.log('User found:',dbUser);
		res.json(dbUser)
	})
	.catch(err=>res.json(err));

};

// UPDATE
// Update a user
exports.user_update = (req,res)=>{
	console.log('UNIMPLEMENTED: Update a user');
};

// DELETE
// Soft delete a user
exports.user_deleteSoft = (req,res)=>{
	console.log('UNIMPLEMENTED: Flag a user as deleted');
};

// Hard delete a user
exports.user_deleteHard = (req,res)=>{
	console.log('UNIMPLEMENTED: Destroy user record to delete');
};


