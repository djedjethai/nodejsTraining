const authCt = require('../controllers/authCt');

module.exports = app => {

	app.post('/signup', authCt.signUp);
	app.post('/login', authCt.logIn);

}
