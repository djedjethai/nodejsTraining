const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.signUp = async (req, res, next) => {

	const { email, password } = req.body;
	if (!email || !password) { 
		debugger;
		const err =  new Error("incomplete credentials") 
		next(err)
		return;
	};
	const user = new User({email, password});
	
	try {
		const found = await User.findOne({email: email})
			if (found) {
				next(new Error('email already in use'))
				return
			}
		const newUser = await user.save();
			res.send(newUser);
	} catch(err) {
		next(new Error('a technical pb appear, pls try again'));
	}

}

exports.signIn = (req, res, next) => {
	// const email  = req.params.email;
	// ok // console.log(req.query.email + " - " + req.query.pass)

	// ok mais ridicule vu qu on utilise express // var query = require('url').parse(req.url,true).query;	
	// console.log(query.email + " - " + query.pass)

	res.send(email);

};
