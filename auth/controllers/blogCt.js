const mongoose = require('mongoose');

const Blog = mongoose.model('Blog')

exports.getBlogs = (req, res, next) => {
	console.log('dasn blog controllers')
	Blog.find({})
		.then(blogs => {
			console.log('find blogs answer')
			console.log(blogs)
			res.send(blogs)
		})
		.catch(err => console.log(err))
}

exports.getBlog = (req, res, next) => {
	// const Id = new mongoose.Types.ObjectId(req.params.id)

	Blog.findOne({ title: req.params.id })
	.then(blog => {
		console.log('get single blog')
		res.send(blog)
	})
}
