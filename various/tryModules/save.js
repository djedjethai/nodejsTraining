const url = require('url');
const async = require('async');
// var addr = 'https://www.edureka.co/blog/interview-questions/top-node-js-interview-questions-2016/default.html?year=2019&month=april';
// 
// var q = url.parse(addr, true);
// console.log(q.host);
// console.log(q.pathname);
// console.log(q.search);
// var qdata = q.query;
// console.log(qdata.month);


// ASYNC MODULE IN PARALLEL
// async.parallel(tasks, callback)
//
// async.parallel([
// 	function(callback) {
//     		setTimeout(function() {
//       			console.log('Task One');
//       			// callback(null, 1);
//     		}, 200);
//   	},
//   	function(callback) {
//     		setTimeout(function() {
//       			console.log('Task Two');
//       			// callback(null, 2);
//     		}, 100);
//   	}
// 	],
// 	function(err, results) {
//   		console.log(results);
//   	// the results array will equal [1, 2] even though
//   	// the second function had a shorter timeout.
// });

// an example using an object instead of an array
// async.parallel({
//   	task1: function(callback) {
//     		setTimeout(function() {
//       			console.log('Task One');
//       			callback(null, 1);
//     		}, 200);
//   	},
//   	task2: function(callback) {
//     		setTimeout(function() {
//       			console.log('Task Two');
//       			callback(null, 2);
//     		}, 100);
//     	}
// 	}, function(err, results) {
// 		console.log(results);
// 	}
// );
// results now equals to: { task1: 1, task2: 2 }
// MOUAI... sur Mac ca return { task2: 2, task1: 1 }......
// i think we have to deal with libuv and the threadpool, et le gars se plante...


// ASYNC MODULE IN SERIE
// async.series(tasks, callback)
// async.series([
//   function(callback) {
//     console.log('one');
//     callback(null, 1);
//   },
//   function(callback) {
//     console.log('two');
//     callback(null, 2);
//   },
//   function(callback) {
//     console.log('three');
//     callback(null, 3);
//   }
// ],
// function(err, results) {
//   console.log(result);
//   // results is now equal to [1, 2, 3]
// });
// 
// async.series({
//   1: function(callback) {
//     setTimeout(function() {
//       console.log('Task 1');
//       callback(null, 'one');
//     }, 200);
//   },
//   2: function(callback) {
//     setTimeout(function() {
//       console.log('Task 2');
//       callback(null, 'two');
//     }, 300);
//   },
//   3: function(callback) {
//     setTimeout(function() {
//       console.log('Task 3');
//       callback(null, 'three');
//     }, 100);
//   }
// },
// function(err, results) {
//   console.log(results);
//   // results is now equal to: { 1: 'one', 2: 'two', 3:'three' }
// });


// ASYNC WATER FALL IN CASE SOME OF THE CB DEPENDS OF THE RESULTS OF OTHERS
// with anonyme function
// async.waterfall([
//   	function(callback) {
//     		callback(null, 'Task 1', 'Task 2');
//   	},
//   	function(arg1, arg2, callback) {
//     		// arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
//     		let arg3 = arg1 + ' and ' + arg2;
//     		callback(null, arg3);
//   	},
//   	function(arg1, callback) {
//     		// arg1 now equals 'Task1 and Task2'
//     		arg1 += ' completed';
//     		callback(null, arg1);
//   	}], 
// 	function(err, result) {
//   		// result now equals to 'Task1 and Task2 completed'
//   		console.log(result);
// 	}
// );


// Or, with named functions:
// async.waterfall([
//   	myFirstFunction,
//   	mySecondFunction,
//   	myLastFunction,
// 	], 
// 	function(err, result) {
//   		// result now equals 'Task1 and Task2 completed'
//   		console.log(result);
// 	}
// );
// 
// function myFirstFunction(callback) {
//   	callback(null, 'Task 1', 'Task 2 euuuh');
// }
// function mySecondFunction(arg1, arg2, callback) {
//   	// arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
//   	let arg3 = arg1 + ' and ' + arg2;
//   	callback(null, arg3);
// }
// function myLastFunction(arg1, callback) {
//   	// arg1 now equals 'Task1 and Task2'
//   	arg1 += ' completed';
//   	callback(null, arg1);
// }






// QUEUE
// create a queue object with concurrency 2
// async.queue(task, concurrency)

// Push add at the end of the queue
// Unshift put it in front of the queue
// Drain will be call after the last task of the queue 

// var q = async.queue(function(task, callback) {
//   	console.log('Hello ' + task.name);
//   	callback();
// 	}, 2);
// 
// // assign a callback
// q.drain = function() {
//   	console.log('All items have been processed');
// };
// 
// // add some items to the queue
// q.push({name: 'push1'}, function(err) {
//   	console.log('Finished processing push1');
// });
// 
// q.push({name: 'push2'}, function (err) {
//   	console.log('Finished processing push2');
// });
// 
// // add some items to the queue (batch-wise)
// q.push([{name: 'push3'},{name: 'bay'},{name: 'bax'}], function(err) {
//   	console.log('Finished processing push3');
// });
// 
// // add some items to the front of the queue
// q.unshift({name: 'unshift'}, function (err) {
//   	console.log('Finished processing unshift');
// });


// PRIORITY QUEUE // DO NOT WORK ......
// async.priorityQueue(task,concurrency)
// create a queue object with concurrency 1
// var q = async.priorityQueue(function(task, callback) {
//   console.log('Hello ' + task.name);
//   callback();
// }, 1);
// 
// // assign a callback
// q.drain = function() {
//   console.log('All items have been processed');
// };
// 
// // add some items to the queue with priority
// q.push({name: 'foo'}, 3, function(err) {
//   console.log('Finished processing foo');
// });
// 
// q.push({name: 'bar'}, 2, function (err) {
//   console.log('Finished processing bar');
// });
// 
// add some items to the queue (batch-wise) which will have same priority
// q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], 1, function(err) {
//   console.log('Finished processing item');
// });


// RACE 
//async.race(tasks, callback)
// async.race([
//   function (callback) {
//     setTimeout(function () {
//       callback(null, 'one');
//     }, 300);
//   },
//   function (callback) {
//     setTimeout(function () {
//       callback(null, 'two');
//     }, 100);
//   },
//   function (callback) {
//     setTimeout(function () {
//       callback(null, 'three');
//     }, 200);
//   }
// ],
//   // main callback
//   function (err, result) {
//     // the result will be equal to 'two' as it finishes earlier than the other 2
//     console.log('The result is ', result);
/
