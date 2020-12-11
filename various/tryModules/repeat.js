const { Writable } = require('stream');
const fs = require('fs');


const outStream = new Writable({
	write(chunk, encoding, cb) {
		console.log(chunk.toString());
		var chunkData = chunk.toString();
		cb(
			if (fs.existsSync('getStream.txt')) {
				var readStream = fs.createReadStream('getStream.txt', 'utf8')
				var data = '';
				readStream.on('data', chunk => {
					data += chunk;
				}).on('end', () => {
					data += chunkData;
					fs.writeFile('getStream.txt', data, err => {
						console.log(done);
					})
				})
			
			} 
			else {
				fs.writeFile('getStream.txt', chunkData, err => {
					console.log('file wrote');
				})
			}
		)
	}
})

process.stdin.pipe(outStream);

