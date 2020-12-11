const fs = require('fs');
const http = require('http');


// const file = fs.createWriteStream('./toDelete.file');
// 
// for (let i=0; i < 1e6; i++) {
// 	file.write('my text jljgkjhgkjhgkhgkhjgkjhgkjhgkjhg ');
// };
// 
// file.end();
// 
// 
// const server = http.createServer();
// server.on('request', (req, res) => {
// 	const src = fs.createReadStream('./toDelete.file');
// 	src.pipe(res);
// });
// server.listen(4000);


// readableSrc.pipe(writableSrc)
// same as
// readableSrc.on('data', (chunk) => {
// 	writableSrc.write(chunk)
// }
// readableSrc.on('end', () => {
// 	writableSrc.end();
// })
//
// ====================================== implementing Writable/Readable streams ====================================


// will echo everything we tape in the stdin of our terminal 
// this is the equivalent of the process.stdout (useless, just for exemple)
const { Writable } = require('stream');

const outStream = new Writable({
	write(chunk, encoding, cb) {
		console.log(chunk.toString());
		cb();
	}
});
process.stdin.pipe(outStream);



// the oposite in this case, useless as well. 
const { Readable } = require('stream');

const inStream = new Readable({
	read() {}
});

inStream.push('QWERTYUIOP');
inStream.push('ASDFGHJKL');

inStream.push();

inStream.pipe(process.stdout);


// while a customer is reading a readable stream, the read method will continue to fire, and we will push more letters
const inStream = new Readable({
	read(size) {
		this.push(String.fromCharCode(this.currentCharCode++));
		if(this.currentCharCode > 90) {
			this.push(null);
		}
	}
});
inStream.currentCharCode = 65;
inStream.pipe(process.stdout);

// ======================================== implementing Duplex/Transform streams =====================================

// DUPLEX STREAM
const { Duplex } = require('stream');

const inoutStream = new Duplex({
	write(chunk, encoding, cb) {
		console.log(chunk.toString());
		cb();
	},

	read(size) {
		this.push(String.fromCharCode(this.currentCharCode++));
		if(this.currentCharCode > 90) {
			this.push(null);
		}
	}
})
inoutStream.currentCharCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);

// TRANSFORM STREAM
// for transform stream we don t have to implement read() or write() methods, 
// the transform() method combine both of them
// mouaiii, don t understand how it works here.......
const { Transform } = require('stream');

const upperCaseTr = new Transform({
	transform(chunk, encoding, cb) {
		this.push(chunk.toString().toUpperCase());
		cb();
	}
})
process.stdin.pipe(upperCaseTr).pipe(process.stdout);



// exemple, transform "a,b,c,d" into a js object {a:b, c:d}
const { Transform } = require('stream');

const commaSplitter = new Transform({
	readableObjectMode: true,

	transform(chunk, encoding, cb) {
		this.push(chunk.toString().trim().split(','));
		cb();
	}
});

const arrayToObject = new Transform({
	readableObjectMode: true,
	writableObjectMode: true,

	transform(chunk, encoding, cb) {
		const obj = {};
		for (let i = 0; i < chunk.length; i+=2) {
			obj[chunk[i]] = chunk[i+1];
		}
		this.push(obj);
		cb();
	}
});

const objectToString = new Transform({
	writableObjectMode: true,

	transform(chunk, encoding, cb) {
		this.push(JSON.stringify(chunk) + "\n");
		cb();
	}
});

process.stdin
	.pipe(commaSplitter)
	.pipe(arrayToObject)
	.pipe(objectToString)
	.pipe(process.stdout)
