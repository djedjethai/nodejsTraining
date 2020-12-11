var file_system, { createReadStream } = require('fs');
// var file_system  = require('fs');
var http = require('http')
const path = require('path');
const express = require('express')

// TO LEARN
// USING BUFFER
// reading file in node asynchronously/non blocking
// file_system.readFile('fileForZip.txt', 'utf8', function(err, content){
// 	console.log(content);
// })
// console.log('after calling file');

// readFile asynchronously and return datas
const data = () => new Promise((resolve, reject) => { 
	fs.readFile('fileForZip.txt', 'utf8', (err, res) => {
		!err ? resolve(res) : reject(err);
	})
})
// do not work, why ...??
// (async() => console.log(await data()))()
data()
	.then(d => console.log(d))
	.catch(e => console.log(e))



// reading file in node asynchronously/blocking
// const data = file_system.readFileSync('fileForZip.txt', 'utf8');
// console.log(data);


// TO LEARN
// read file and create a new one
// file_system.readFile('fileForZip.txt', 'utf8', (err, content) => {
// 	console.log('before write');
// 	file_system.writeFile('copyText.txt', content, err => {
// 		console.log('file has been created');
// 	})
// })


// mix fs module with child_process module, PUISSANT !!!
// const rt = () => new Promise((resolve, reject) => {
// 
// 	fs.readFile('./fileForZip.txt', 'utf8', (err, content) => {
// 		fs.writeFile('./newFile.txt', content, err => {
// 			if (!err) {
//  				const ex = util.promisify(exec);
// 				const grr = async () => {
// 					const { stdout, stdin, stderr } = await ex('cat newFile.txt');
// 					return(`${stdout}`)
// 				}	
// 				grr().then(d => resolve(d))
// 			} else {
// 				reject('ann err occur');
// 			}	
// 		})
// 	})
// })
// 
// rt()
// 	.then(d => console.log(d))
// 	.catch(e => console.log(e));




// USING STREAM, ok but still use a buffer, 
// need a server to really stream it
// var data = '';
// 
// var readStream = file_system.createReadStream('fileForZip.txt', 'utf8');
// 
// readStream.on('data', function(chunk) {
// 	data += chunk;
// }).on('end', () => {
// 	console.log(data);
// })

// TO LEARN
const app = express();

app.get('/', (req, res) => {
	var readStream = createReadStream('./public/fileForZip.txt');
	
	// without piping
	// readStream.on('data', (data) => {
	// 	res.write(data);
	// })

	// readStream.on('end', (data) => {
	// 	res.status(200).send();
	// })
	
	// with piping
	readStream.pipe(res);
	setTimeout(() => {
		readStream.unpipe(res);
		res.status(200).send();
	}, 1000)
})

app.listen(8080, () => {
	console.log('listen on 8080');
})




// STREAMING WITH A SERVER (coool) // but a finir, ne sait pas how to extract datas from stream
// var staticBasePath = './public';
// 
// var staticServe = (req, res) => {
// 	var fileLoc = path.resolve(staticBasePath);
// 	fileLoc = path.join(fileLoc, req.url);
// 
// 	var stream = file_system.createReadStream(fileLoc);
// 
// 	stream.on('error', (err) => {
// 		res.writeHead(404, 'Not Found');
// 		res.end();
// 	})
// 
// 	console.log(stream);
// 	stream.pipe(res);
// 
// 	// create err res.send() is not a function
//  	
// 	res.writeHeader(200, {'Content-Type':'text/plain'})
// 	setTimeout(() => {
// 		stream.unpipe(res);
// 		stream.on('data', (data) => {
// 			res.write(`${data}`);
// 		});
// 
// 	}, 1000);
// 	
// 	res.end();
// }
// 
// var httpServer = http.createServer(staticServe);
// httpServer.listen(8080);


// http.createServer((req, res) => {
// 	
// 	var writeStream = fs.createWriteStream('./output.txt');
// 
// 	req.pipe(writeStream);
// 
// 	req.on('end', () => {
// 		res.writeHead(200, {'Content-Type':'text/html'});
// 		res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
// 	})
// 
// 	writeStream.on('error', err => {
// 		console.log(err)
// 	})
// 
// }).listen(4000);



// CREATE A ZIP FILE 
// var archiver = require('archiver');
// var output = file_system.createWriteStream(__dirname + 'target.zip');
// var archive = archiver('zip', zlib: { level:9 });
// 
// output.on('close', function () {
//     console.log(archive.pointer() + ' total bytes');
//     console.log('archiver has been finalized and the output file descriptor has closed.');
// });
// 
// // This event is fired when the data source is drained no matter what was the data source.
// // It is not part of this library but rather from the NodeJS Stream API.
// // @see: https://nodejs.org/api/stream.html#stream_event_end
// output.on('end', function() {
//   console.log('Data has been drained');
// });
//  
// // good practice to catch warnings (ie stat failures and other non-blocking errors)
// archive.on('warning', function(err) {
//   if (err.code === 'ENOENT') {
//     // log warning
//   } else {
//     // throw error
//     throw err;
//   }
// });
//  
// // good practice to catch this error explicitly
// archive.on('error', function(err) {
//   throw err;
// });
//  
// // pipe archive data to the file
// archive.pipe(output);
//  
// // append a file from stream
// const file1 = __dirname + '/file1.txt';
// archive.append(fs.createReadStream(file1), { name: 'file1.txt' });
//  
// // append a file from string
// archive.append('string cheese!', { name: 'file2.txt' });
//  
// // append a file from buffer
// const buffer3 = Buffer.from('buff it!');
// archive.append(buffer3, { name: 'file3.txt' });
//  
// // append a file
// archive.file('file1.txt', { name: 'file4.txt' });
//  
// // append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory('subdir/', 'new-subdir');
//  
// // append files from a sub-directory, putting its contents at the root of archive
// archive.directory('subdir/', false);
//  
// // append files from a glob pattern
// archive.glob('subdir/*.txt');
//  
// // finalize the archive (ie we are done appending files but streams have to finish yet)
// // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
// archive.finalize();
