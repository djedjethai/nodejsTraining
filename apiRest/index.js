const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/dev');
const authRt = require('./routes/authRt');

const app = express();
app.use(bodyParser.json());

require('./models/user');


app.use((req, res, next) => {
	res.setHeader("Access-Control_Allow-Origin", "*");
	res.setHeader("Access-Control_Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
	res.setHeader("Access-Control_Allow-Headers", "Content-Type");
	next();
})

require('./routes/authRt')(app);


app.use((error, req, res, next) => {
	console.log('in middle ware catch err');
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({message, data});
})

const MONGO_URI = keys.mongoURI;
if (!MONGO_URI) {
	throw new Error("mongodb uri incorrect")
}
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection
	.once('open', () => console.log('connected'))
	.on('error', err => console.log('err connection' + err))


// for http server (/bin/www)
// module.exports = app;

app.listen(5000, () => {
	console.log('listen on port 5000');
});
