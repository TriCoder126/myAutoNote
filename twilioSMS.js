// Project: myAutoNote
// Node.js application which leverages Twilio API in order to send 
// John Pridmore <jprid@github.com>
// 2/25/17


// imports Twilio dependencies
const twilio = require('twilio');		
class SMS_Sender{
	// Class: SMS sender 
	// Sends SMS to phone via Twilio API
	// Can also delay for specified amt. of time. 
	constructor(toNo){
		this.fromNum = '+18475581758';
		this.toNum = toNo;
		this.messageQueue = new messageQ();
		// TODO: add ACCOUNT_SID from included .env file
		// TODO: add AUTH_TOKEN from included .env file
	}

	sendMessage(body) {
		// Fxn:sendMessage
		// Send message to phone via SMS utilizing Twilio's API
		// @param: body; string; string containing message to be sent

		// TODO: REMOVE THESE VARIABLES BEFORE PUSHING TO GITHUB
		let client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
		client.sendMessage({
			to: this.toNum,
			from: this.fromNum,
			body: body
		});
	}

	reminder(body, timeUntilNext){
		// continuously reminds users while timeUntilNext != 0
		// @param: timeUntilNext: 
		// if(timeUntilNext != 0){
		// 	reminder(messageQueue.dequeue(), )
		// }
		return 0;
	}
};

class messageQ{
	constructor(){ this.list = []; 	}
	enqueue(e){	this.list.push(e); 	}
	dequeue(){	return this.list.shift(); 	}
}

// let butts = new SMS_Sender('+18474714073');
// butts.sendMessage()

let test = new messageQ();
test.enqueue(1);
test.enqueue(5);
console.log(test.dequeue());
test.enqueue(2);
console.log(test.dequeue());
let test2 = [1, 2, 3, 4];
console.log(test2.shift());


// message_size 				--> 
// queue for whole message body --> inputs document one message_size at a time
// 