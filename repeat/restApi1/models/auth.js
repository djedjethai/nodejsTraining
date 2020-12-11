const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
})

mongoose.model('User', newUser);
