const blogCt = require('../controllers/blogCt');
const isAuth = require('../services/auth');

module.exports = app => {
	app.post('/addblog', isAuth, blogCt.addBlog)
}
