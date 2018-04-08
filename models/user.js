const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	// Connect user to auth0's id 
	auth0_id: { type: String, required: true},

	// User name managed in our app, seeded by auth0 nickname
	username: { type: String, required: true},

	// Date stuff
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},
	lastlogin_at: { type: Date, default: Date.now},

	// Soft Delete
	deleted: { type: Boolean, default: false},

	// User's Posts on a group and Comments on Posts
	post: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
	comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],

	// Group relations
	adminof: [{ type: Schema.Types.ObjectId, ref: 'Adminof' }],
	memberof: [{ type: Schema.Types.ObjectId, ref:'Memberof'}]


});

userSchema
.virtual('created_at_formatted')
.get(function(){
	return moment(this.created_at).local().format('MM-dd-YYYY h:mm a');
})
userSchema
.virtual('updated_at_formatted')
.get(function(){
	return moment(this.updated_at).local().format('MM-dd-YYYY h:mm a');
});
userSchema
.virtual('lastlogin_at_formatted')
.get(function(){
	return moment(this.lastlogin_at).local().format('MM-dd-YYYY h:mm a');
});
userSchema.set('toObject', {
    virtuals: true
});

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', userSchema);