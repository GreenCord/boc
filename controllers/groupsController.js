const group = require('../models/group');

var async = require('async');

// CRUD API

// CREATE
// Create a group
exports.group_create = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Create a group', req.body);
}

// READ
// Find all groups
exports.group_findAll = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Find all groups');
}
// Find one group
exports.group_findOne = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Find one group');
}

// UPDATE
// Update a group
exports.group_update = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Update a group');
}

// DELETE
// Soft delete a group
exports.group_deleteSoft = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Flag a group as deleted');
}
// Hard delete a group
exports.group_deleteHard = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Destroy group record');
}