// const express = require('express');
const mongoose = require('mongoose');

const AuthService = require('../services/auth');
// const router = express.Router();

const User = mongoose.model('User');

module.exports = app => {
	app.post('/signup', (req, res, next) => {
		const { email, password } = req.body;
		const userSaved = AuthService.signup({email, password, req})
		userSaved.then((data) => {
			console.log(data);
		})
		.catch(next)
		// .catch(err => console.log(err))

		res.status(201).json({
			message: 'look like its fine',
			email,
			user: userSaved
		})
	});
	app.post('/login', (req, res, next) => {
		const {email, password} = req.body;
		const user = AuthService.login({email, password, req});
		console.log('user is login');
		user.then((value) => {
			console.log(value);
			res.send(value);
		})
		.catch(next)
		// .catch(err => {
		// 	return res.status(422).json({
		// 		mess: "wrong credential",
		// 		err
		// 	})		
		// })
	})

}




// const router = express.Router();
// 
// 
// router.post('/signup', (req, res, next) => {
// 	const { email, password } = req.body;
// 	// const userSaved = AuthService.signup({email, password, req})
// 	console.log('ds authRT');
// 	console.log(email);	
// })
// 
// 
// module.exports = router;
