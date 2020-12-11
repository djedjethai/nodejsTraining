const http = require('http');
const fs = require('fs');
const url = require('url');

// SIMPLE HTML REQ-RES
const server = http.createServer((req, res) => {
	if (req.url === '/page1') {
		res.writeHeader(200, {'Content-Type':'text/html'});
		res.write('<p>some html</p>');
		res.end();
	}
	else if (req.url === '/page2') {
		res.writeHeader(200, {'Content-Type':'text/html'});
		res.write('<p>some html</p>');
		res.end();
	}
	else if (req.url === '/page3') {
		res.writeHeader(200, {'Content-Type':'text/html'});
		res.write('<p>some html</p>');
		res.end();
	}
	else {
		res.end('Invalid request')
	}
});
server.listen(4000);


// NODE HTTP QUERY PARAMETERS
http.createServer((req, res) => {
	let q = url.parse(req.url, true).query;
	let message = `${q.name} is ${q.age} years old`;

	res.writeHeader(200, {'Content-Type':'text/plain'});
	res.write(message);
	res.end()
}).listen(4000);
// curl http://localhost:4000/?name=simon&age=45
// simon is 45 years old

// ==============================================================================
// ROUTING USING THE 'PATHNAME'
// 3 routes

// first doc: doc/about.html
<!DOCTYPE html>
<html lang="en">
	<head></head>
	<body></body>
</html>
// second doc: doc/contact.html
<!DOCTYPE html>
<html lang="en">
	<head></head>
	<body></body>
</html>
// third doc: doc/index.html
<!DOCTYPE html>
<html lang="en">
	<head></head>
	<body></body>
</html>

//http_server,js
const server = http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname;

	if (pathname == '/') { pathname = '/index.html' }

	fs.readFile('docs/' + pathname.substr(1), (err, data) => {
		if (err) { 
			res.writeHeader(404, {'Content-Type':'text/plain'});
			res.write('404 - file not found');
			res.end();
		}
		else {
			res.writeHeader(200, {'Content-Type':'text/html'});
			res.write(data.toString());
		}
		res.end();
	});

});
server.listen(4000)

// ====================================================================================
// NODE HTTP GET REQUEST
const options = {
	hostname: 'webcode.me',
	port: 80,
	path: '/',
	method: 'GET'
};
// we create a req using .request (on the path defined in the obj)
const req = http.request(options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);

	// we continuously(we stream i guess) write incoming data to the console in the data event handler
	res.on('data', d => {
		process.stdout.write(d)
	});
});

req.on('error', err => {
	console.log(err);
})

req.end();

// ALTERNATIVELY, WE CAN USE THE GET() METHOD
const req = http.get({ host: 'webcode.me', path: '/' }, res => {
	
	//continuously update stream with data
	let content = '';

	res.on('data', chunk => {
		content += chunk;
	});

	res.on('end', () => {
		console.log(content);
	})
});

res.end();

// ============================================================================
// POST REQUEST. USING HTTPS MODULE
const https = require('https');

let payload = JSON.stringify({
	"name": "Peter",
	"age": 34
});

let headers = {
	'Content-Type':'application/json',
	'Content-length':Buffer.byteLength(payload, 'utf8')
};

let options = {
	host: 'httpbin.org',
	port: 443,
	path: '/post',
	method: 'POST',
	headers: headers
};

let reqPost = https.request(option, res => {
	console.log('status code: ', res.statusCode);

	res.on('data', chunks => {
		process.stdout.write(chunks);
	})
})

reqPost.write(payload);
reqPost.end();

reqPost.on('error', err => console.log(err));






