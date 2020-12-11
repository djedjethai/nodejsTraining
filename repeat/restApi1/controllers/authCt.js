const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');


exports.signUp = (req, res, next) => {
	const { email, password } = req.body;
	
	if (!email || ! password ) { 
		next(new Error('invalid credentials')) 
		return;
	};

	const user = new User({
		email, 
		password
	})
	User.findOne({email: email})
		.then(isUser => {
			if (isUser) {
				next(new Error('email already in use'))
				return
			} else {
				console.log(user);
				return user.save()
			}
		})
		.then(user => {
			if (!user) { return }
			res.status(201).json({ user })
		})
		.catch(e => {
			next(new Error('an Error occur, please try again'))
		})
}

exports.logIn = async (req, res, next) => {

	const { email, password } = req.body;
	if (!email || !password) {
		next(new Error('invalid credentials'));
		return;
	};
	
	try { 
		const user = await User.findOne({email: email, password: password})
		if (!user) {
			next(new Error('Account unfound'))
			return;
		}
		if (password !== user.password) {
			next(new Error('invalid credentials'));
			return;
		}
		console.log(user._id);
		const token = jwt.sign(
			{_id:user._id},
			"thisIsTheSecret",
			{ expiresIn: '1h' }
		)
		console.log(token);
		res.status(200).json({ user, token })
	} catch(e) {
		next(new Error('a technical problem occured, please try again'));
	}
}
