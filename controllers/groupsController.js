const group = require('../models/group');
const user = require('../models/user');

var async = require('async');

// CRUD API

// CREATE
// Create a group
exports.group_create = (req,res)=>{
	console.log('Express Controller/Route: Create a group', req.body);
	// groupname_id should be lowercase alphanumeric with spaces removed
	var groupname_id = JSON.stringify(req.body.groupname).toLowerCase().replace(/\W/g, '');
	var user_id = req.body._id;
	console.log('Creating groupname_id:',groupname_id);

	// create model to insert if not found
	var data = {
		groupname: req.body.groupname,
		groupname_id: groupname_id,
		description: req.body.description,
		admin: [user_id],
		member: [user_id] 
	}

	// check db for groupname_id to make sure it doesn't exist
	group.findOneAndUpdate(
		{groupname_id: groupname_id},
		data,
		{ upsert: false }
	).then(dbGroupCheck =>{
		console.log('Check results of findOneAndUpdate:',dbGroupCheck);
		// if groupname_id doesn't exist, create it
		if (!dbGroupCheck) {
			group.create(
				data
			).then(dbGroup=>{
				console.log('Created group:',dbGroup);
				console.log('Update user:',user_id);
				console.log('With groupid:',dbGroup._id);
				user.findOneAndUpdate(
					{_id: user_id },
					{$push: {
						memberof: dbGroup._id, 
						adminof: dbGroup._id
						}
					},
					{ new: true }
				).then(dbUser=>{
					console.log('Updated user:',dbUser);
					console.log('Returning group:',dbGroup);
					return res.json(dbGroup);
				}).catch(err=>res.json(err));
				// end then/dbGroup
			}).catch(err=>res.json(err));
		} else {
			console.log('Group already exists!');
			return res.json(null);
		}
	}).catch(err=>res.json(err));
	
}

// READ
// Find all groups
exports.group_findAll = (req,res)=>{
	console.log('Express Controller/Route: Find all groups');
	group.find({})
	// .populate('member post')
	.then(dbGroup=>{
		console.log('Groups found:',dbGroup);
		res.json(dbGroup)
	})
	.catch(err=>res.json(err));
}
// Find one group
exports.group_findOne = (req,res)=>{
	console.log('Express Controller/Route: Find one group',req.params.id);
	group.findById(req.params.id)
	.populate('member post.author_id post')
	.then(dbGroup=>{
		console.log('Group found:',dbGroup);
		res.json(dbGroup)
	})
	.catch(err=>res.json(err));
}

// Find user's groups
exports.group_findByUser = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Find groups by user',req.params.id);
	group.find(
		{	member: req.params.id }
	).then(dbGroups=>{
		console.log('Groups found:',dbGroups);
		res.json(dbGroups);
	}).catch(err=>res.json(err));

}

// UPDATE
// Update a group
exports.group_update = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Update a group');
}

// Add user to a group (as member)
exports.group_addMember = (req,res)=>{
	console.log('UNIMPLEMENTED Express Controller/Route: Add member ' + req.params.uid + ' to group ' + req.params.id + '.');
	user.findOneAndUpdate(
			{_id: req.params.uid },
			{$push: {
				memberof: req.params.id
				}
			},
			{ new: true }
		).then(dbUser=>{
			console.log('User updated with new group',dbUser);
			group.findOneAndUpdate(
				{_id: req.params.id},
				{$push: {
					member: req.params.uid
					}
				},
				{ new: true }
			).then(dbGroup=>{
				console.log('Group updated with new user',dbGroup);
				res.json(dbGroup);
			}).catch(err=>res.json(err));
		}).catch(err=>res.json(err));

	

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