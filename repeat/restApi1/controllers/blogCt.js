const mongoose = require('mongoose');

const Blog = mongoose.model('Blog');

exports.addBlog = (req, res, next) => {
	console.log('ds controller blog');
	console.log(req.userId);
	const { title, _id } = req.body;
	console.log(title + ' - ' + _id);

	if ( !title || !_id ) { 
		next(new Error('post invalid'))
		return;
	}

	const blog = new Blog({ 
		title: title, 
		creator: _id 
	});

	blog.save()
		.then(bl => {
			console.log(bl);
			res.status(201).json({ title, _id, creator: bl.creator });	
		})
		.catch(e => {
			next(new Error('a tech pb occured, try again'))
		})

}


