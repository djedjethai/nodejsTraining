const crypto = require('crypto');

var secret = 'abcdef';

var hash = crypto.createHmac('sha256', secret)
	.update("cool")
	.digest('hex');
console.log(hash);
