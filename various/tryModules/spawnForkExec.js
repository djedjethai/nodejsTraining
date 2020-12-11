const { spawn, fork } = require('child_process');
const util = require('util');
const http = require('http');


// const { exec } = require('child_process');
// exec('find -type f  | wc -l', (error, stdout, stderr) => {
//   if (error) {
// 	  console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


// SPAWN
// EXEMPLE 1
// const child = spawn('ls', ['-a', '-l']);
// 
// child.on('exit', code => {
//   console.log(`Exit code is: ${code}`);
// });
// 
// Async Iteration available since Node 10
// const euh = async () => {
// 	for await (const data of child.stdout) {
//   		console.log(`stdout from the child: ${data}`);
// 	};
// }
// euh()
// (async () => {
// 	for await (const data of child.stdout) {
//   		console.log(`stdout from the child: ${data}`);
// 	};
// })()

// EXEMPLE2 // does not work but as the mother process do not have any stdin, 
// it can not pipe it to the child process, maybe why there is no log
// const child = spawn('wc');
// 
// process.stdin.pipe(child.stdin);
// 
// (async() => {
// 	for await (const data of child.stdin) {
// 		console.log(`stdout from the child ${data}`)
// 	}
// })()

// const find = spawn('find', ['.', '-type', 'f']);
// const wc = spawn('wc', ['-l']);
// 
// find.stdout.pipe(wc.stdin);
// 
// (async() => {
// 	for await(const data of wc.stdout) {
// 		console.log(`number of file: ${data}`);	
// 	}
// })()


// EXEC
// same spawn but create a shell and instead of using a stream, buffer the entire output
 const exec = util.promisify(require('child_process').exec);
 
 const main = async() => {
	// const { stdout, stdin, stderr } = await exec('find . -type f | wc -l');
 	const { stdout, stderr } = await exec('cat package.json')
	if (stderr) {
		console.log(stderr)
	}
	console.log(`the number of line in this directory is: ${stdout}`)
}

main();


// FORK
// when url detected, fork() start a new process calling on it the compute.js file
// then compute.on() listen on the 'message' event, emited from the other file (compute.js) asa its task end
// then the server return the result.
// means that this heavy task has been executed a separate process, letting the server's one available to run others req
// const server = http.createServer();
// 
// server.on('request', (req, res) => {
// 	if (req.url === '/compute') {
// 		const compute = fork('compute.js')
// 		compute.send('start')
// 
// 		compute.on('message', result => {
// 			res.end(`longcomputation result ${result}`) // longcomputation result 499999999067109000
// 		})
// 	} else {
// 		res.end('route not found');	
// 	}
// })
// 
// server.listen(3000, () => {
// 	console.log('listening 3000')
// })

