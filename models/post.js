const moment = require('moment');
const mongoose = require('mongoose');
// const user = require('./user');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	// Author of post (id)
	author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},

	// Group post was in (id)
	group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true},

	// Date stuff
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},

	// Soft Delete
	deleted: { type: Boolean, default: false},

	// Post Content
	content: { type: String, required: true},

	// Post Comments
	// User's Posts on a group
	comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]

});

postSchema
.virtual('created_at_formatted')
.get(function(){
	return moment(this.created_at).local().format('M/D/YYYY h:mm a');
})
postSchema
.virtual('updated_at_formatted')
.get(function(){
	return moment(this.updated_at).local().format('M/D/YYYY h:mm a');
});
// postSchema
// .virtual('author_username')
// .get(function(){
// 	user.find({
// 		_id: this.author_id
// 	}).then(dbAuthor=>{
// 		return dbAuthor.username;
// 	})
// });

postSchema.set('toObject', {
    virtuals: true
});

postSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Post', postSchema);