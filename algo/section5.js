
function duplicate(str) {

	let sml = 0;
	let big = 1;
	let start = false;
	while (start != true) {
		if(str[sml] === str[big]) {
			sml++;
			big++;
		} 
		else {
			start = true;
		}
	}

	let done = false;
	let cont = 1;
	let obj = {};
	let obj[str[sml]] = 1;
	while( done != true ) {

		if ( !obj[str[big]] ) {
			obj[str[big]] = 1;
			big++;
			cont++;
		}
		else if ( str[sml] !== str[big] ) {
			let i = big + 1;		
		}







		



	}





};

console.log(duplicate('abracadabra'));
