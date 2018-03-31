const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
	// User name managed in our app
	groupname: { type: String, required: true},
	description: { type: String, required: true},

	// Date stuff
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},

	// Soft Delete
	deleted: { type: Boolean, default: false},


	// Users in Group, Admins
	member: [{type: Schema.Types.ObjectId, ref:'Member'}],
	admin: [{type: Schema.Types.ObjectId, ref:'Admin'}],

	// User's Posts on a group
	post: [{ type: Schema.Types.ObjectId, ref: 'Post'}]

});

groupSchema
.virtual('created_at_formatted')
.get(function(){
	return moment(this.created_at).local().format('MM-dd-YYYY h:mm a');
})
groupSchema
.virtual('updated_at_formatted')
.get(function(){
	return moment(this.updated_at).local().format('MM-dd-YYYY h:mm a');
});

module.exports = mongoose.model('Group', groupSchema);