const express = require('express');

const app = express();

// set helmet
const helmet = require('helmet');
app.use(helmet());

// set cookie-session 
// not good for API
const session = require('cookie-session');

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
	name: 'session',
	keys: ['key1', 'key2'],
	cookie: {
		secure: true,
		httpOnly: true,
		domain: 'mydomain.com',
		path: 'foo/bar',
		expires: expiryDate
	}
}))

// set cookies
// can be good for api, to send some data to the client's browser
// data for front-end fonctionnement. BUT NOT for auth 
const cookieParser = require('cookie-parser');

app.use(cookieParser);
app.use((req, res, next) => {
	// check if client sent cookie
	var cookie = req.cookies.cookieName;
	if (cookie === undefined) {
		var randomNumber = Math.random().toString();
		randomNumber = randomNumber.substring(2, randomNumber.length);
		res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
		console.log('created cookie succefully');
	} else {
		console.log('cookie exist', cookie)
	}
	next();
});


