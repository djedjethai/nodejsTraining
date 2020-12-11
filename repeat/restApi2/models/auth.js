const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type:String,
		require:true
	},
	password: {
		type:String,
		require:true
	}
});

mongoose.model('User', userSchema);

