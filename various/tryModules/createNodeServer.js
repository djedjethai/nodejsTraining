const http = require('http');
const https = require('https');
// SIMPLE
// const server = http.createServer((req, res) => {
// 
// 
// 
// 
// }) 
// 
// 
// 
// server.listen(5000, () => {
// 	console.log('listen on port 5000');
// });

// DIFFERENT
const newServer = (req, res) => {

	if ( req.url == '/html' ) {
		res.writeHeader(200, { 'Content-Type':'text/html' });
		res.write('<html><body><h1>this is the html page</h1></body></html>');
		res.end();
	} else if ( req.url == '/json' ) {
		res.writeHeader(200, { 'Content-type':'application/json'});
		res.write(JSON.stringify({message: "Hello world from json"}));
		res.end();
	} else {
		res.end('invalid request');
	}
}

const server = http.createServer(newServer);
server.listen(6000, () => {
	console.log('listen on port 6000')
})

// CREATE HTTPS REQ
function doRequest() {
	https
		.request('https://www.goolge.com', res => {
			res.on('data', (data) => {
				console.log(`${data}`)
			})
			res.on('end', () => {})
		})
		.end();
};

// INTEGRATE IT IN A REAL REQ
const srv = http.createServer((req, res) => {
	if (req.url === '/heavy') {
		const compute = fork('./compute.js');
		compute.send('start');

		compute.on('message', content => {
			res.writeHeader(200, {'Content-Type':'text/html'});
			res.write(`${content}`);
			res.end();
		})
	}
	else {
		res.end('wrong url')
	}
})

srv.listen(8000);

