// CALLBACK 1
// function mainfunc(cb){
// 	setTimeout(() => {
// 		cb("end of cb");
// 	}, '3000');
// }
// 
// function myCallback(v) {
// 	console.log(v)
// }

// mainfunc(myCallback);

// CALLBACK RETURN A VALUE // CAN NOT, IN THIS CASE, NEED A PROMISE
// function mainfunc(cb, x){
// 	console.log('ook')
// 	setTimeout(() => {
// 		console.log('grrr')
// 		console.log(x)
// 		return cb(x);
// 	}, '3000');
// }
// 
// function myCallback(v) {
// 	return v + 100;
// }
// DO NOT WORK
// const retCb = mainfunc(myCallback, 34);
// console.log(retCb);
// mainfunc(myCallback, 34).then(re => console.log(re));



// SOLUTION AVEC PROMISE
function mainfunc(cb, x){
	return new Promise((resolve, reject) => {
		if (x < 0) {
			reject("the number can not be negatif")
		}

		setTimeout(() => {
			resolve(cb(x));
		}, '3000');

	})
}

function myCallback(v) {
	return v += 100;
}
// mainfunc(myCallback, 56)
//	.then(res => console.log(res))
//	.catch(err => console.log(err))

// with async/await
(async () => console.log(await mainfunc(myCallback, 34)))()

// function p(y) {
// 	return new Promise((resolve, reject) => {
// 		x = 62;
// 		if (x < 10) {
// 		setTimeout(() => {
// 			resolve("the number is:" + y);
// 		})
// 		} else {
// 			reject("nooooo")
// 		}	
// 	})
// }
// 
// const xc = async () => {
// 	try {
// 		const x = await p(12);
// 		console.log(x);
// 	} catch(err) {
// 		console.log(err)
// 	}
// };
// 
// xc();

// (async () => {
// 	const z = await p(45);
// 	console.log(z);
// })()


// p(456)
// 	.then((res) => console.log(res))
// 	.catch(err => console.log(err))
