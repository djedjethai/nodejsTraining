const blogCt = require('../controllers/blogCt');

module.exports = app => {
	app.get('/blogs', blogCt.getBlogs);
	app.get('/blog/:id', blogCt.getBlog);
}
