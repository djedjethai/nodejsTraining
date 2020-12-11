const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const keys = require('./config/dev');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin',"*");
	res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
	// res.setHeader('Access-Control-Allow-Headers','Content-Type');
	next();
})


// import models
require('./models/auth');
require('./models/blog')

mongoose.Promise = global.Promise;
const MONGODB_URL = keys.mongoDB;
mongoose.connect(MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection
	.once('open', () => console.log('connection successful'))
	.on('error', () => console.log('error on db connection'))

// import routes
require('./routes/authRt')(app);
require('./routes/blogRt')(app);

app.use((err, req, res, next) => {
	const status = err.status || 500;
	const mess = err.message;
	res.status(status).json({ status, mess });
})

app.listen(3000, () => {
	console.log('listen on port 3000');
})


