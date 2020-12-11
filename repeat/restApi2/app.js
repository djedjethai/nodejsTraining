const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('./config/dev');

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false  }))

app.use(express.static(path.join(__dirname, "services")));


require('./models/auth');

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Methods","POST, GET, PATCH, PUT, HEAD, CONNECT, OPTION, TRACE, DELETE");
	res.setHeader("Access-Control-Allow-Headers","Content-Type");
	next()
});



mongoose.Promise = global.Promise;
const MONGO_URL = keys.mongoDb;
mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection
	.once('open', () => console.log("db connection has been open"))
	.on('error', () => console.log("connection error"))

require('./routes/authRt')(app);

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({ mess: err.message })
})

app.listen(5000, () => {
	console.log("listen on port 5000")
})
