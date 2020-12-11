function test(x) {
	return new Promise((resolve, reject) => {
		if (x > 10) {
			resolve("more than 10")
		} else {
			reject("err less than 10")
		}
	})
}

const ak = async() =>  {
	try {
		console.log(await test(23));
		console.log(await test(3));

	} catch(e) {
		console.log(e)
	}
}

ak();


