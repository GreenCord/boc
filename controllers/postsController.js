const group = require('../models/group');
const post = require('../models/post');
const user = require('../models/user');

var async = require('async');

// POST create post, save to user and group
exports.post_create = (req,res)=>{
	console.log('UNIMPLEMENTED - Express Controller/Route: Create a post:');

	post.create({
		author_id: req.body.author_id,
		content: req.body.content
	})
	.then(dbPost =>{
		console.log('Post created:',dbPost);
		console.log('Now find author')
		user.findOneAndUpdate(
			{_id: dbPost.author_id},
			{$push: { post: dbPost._id } },
			{ new: true}
		).then(dbUser => {
			console.log('ID pushed to user:',dbUser.post)
			group.findOneAndUpdate(
				{_id: req.body.group_id},
				{$push: { post: dbPost._id } },
				{ new: true}
			).then(dbGroup => {
				console.log('ID pushed to group:',dbGroup.post);
				return res.json(dbPost);
			})
			.catch(err=>res.json(err));
		})
		.catch(err=>res.json(err));
	})
	.catch(err=>res.json(err));
		
}