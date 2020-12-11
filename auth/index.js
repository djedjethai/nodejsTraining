const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cluster = require('cluster');

const keys = require('./config/keys');
// const authRouter = require('./routes/authRt');

// if (cluster.isMaster) {
// 	cluster.fork();
// 	cluster.fork();
// 	cluster.fork();
// 	cluster.fork();
// } else {

const app =  express();
app.use(bodyParser.json());

require('./models/User');
require('./models/Blog');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

mongoose.Promise = global.Promise;

const MONGO_URI = keys.mongoURI;
if (!MONGO_URI) {
	throw new Error("err mongo keys");
}
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection
	.once("open", () => console.log("connected"))
	.on('error', error => console.log('err connection: '+ error))

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'abcd',
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		autoReconnect: true
	})
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRt')(app);
require('./routes/blogRt')(app);

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const mess = error.mess;
	const data = error.data;
	console.log('ds err catcher');
	res.status(status).json({ status, mess, data})
});

// for prod
module.exports = app;

// for development
// app.listen(4000, () => {
// 	console.log("listen on port 4000")
// })
// }
