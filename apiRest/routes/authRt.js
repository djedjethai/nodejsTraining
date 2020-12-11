// const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');



const authCt = require('../controllers/authCt');

module.exports = app => {

	app.post('/signup', [
			
		],  authCt.signup);
	
	app.post('./signin', authCt.signin);
}

// const router = app.Router();
// 
// router.post('/signup', authCt.signup);
// 
// router.post('./signin', authCt.signin);
// 
// 
// 
// module.exports = router;
