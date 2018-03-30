const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	// Author of post (id)
	author_id: { type: Schema.Types.ObjectId, ref: 'Author_Id', required: true},

	// Date stuff
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},

	// Soft Delete
	deleted: { type: Boolean, default: false},

	// Post Content
	content: { type: String, required: true}

});

postSchema
.virtual('created_at_formatted')
.get(function(){
	return moment(this.created_at).local().format('MM-dd-YYYY h:mm a');
})
postSchema
.virtual('updated_at_formatted')
.get(function(){
	return moment(this.updated_at).local().format('MM-dd-YYYY h:mm a');
});

module.exports = mongoose.model('Post', postSchema);