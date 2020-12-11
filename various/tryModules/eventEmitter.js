const events = require('events');

const eventEmitter = new events.EventEmitter();

let myEvent = function ringBell() {
	console.log('my costumised event is emitteed, cooool');
}

eventEmitter.on('emitMyEvent', myEvent);

eventEmitter.emit('emitMyEvent');


