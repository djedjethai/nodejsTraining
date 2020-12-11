const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBlog = new Schema({
	title: {
		type: String,
		require: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	}
})

mongoose.model('Blog', newBlog);

