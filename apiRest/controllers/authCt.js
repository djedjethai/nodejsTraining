const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const User = mongoose.model('User');


exports.signup = async (req, res, next) => {
	const {email, password} = req.body;

	try {
		const hPass = await bcrypt.hash(password, 12)
		const user = new User({ email, password });
		const savUser = await user.save();
		console.log('user has been saved')
		res.status(201).json({
			message: "User saved to db",
			user
		})

	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}

}

exports.signin = async (req, res, next) => {
	console.log('signnin')
	const {email, password} = req.body;
}




