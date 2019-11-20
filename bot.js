require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;


let timeNow = new Date().toLocaleTimeString('en-US');
let lastHeliTime
let lastCargoTime
let lastBradleyTime


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!heli') {
		try {
			lastHeliTime = timeNow;
			message.channel.send(`The heli spawn time has been set to: ${lastHeliTime}. To check this time in the future, type the command ?heli.`);
		} catch (error) {
			console.log(`Something went wrong: ${error}`)
		}
	}
	console.log(message.content);
});

client.on('message', message => {
	if (message.content === '?heli') {
		try {
			message.channel.send(`The heli was last recorded up at ${lastHeliTime}.`);
		} catch (error) {
			console.log(`Something went wrong: ${error}`)
		}
	}
	console.log(message.content);
});

client.on('message', message => {
	if (message.content === '!cargo' || message.content === '!boat' || message.content === '!ship') {
		try {
			lastCargoTime = timeNow;
			message.channel.send(`The cargo ship spawn time has been set to: ${lastCargoTime}. To check this time in the future, type the command ?cargo.`);
		} catch (error) {
			console.log(`Something went wrong: ${error}`)
		}
	}
	console.log(message.content);
});

// client.on('message', message => {
// 	if (message.content === '?cargo' || '?boat' || '!ship') {
// 		try {
// 			message.channel.send(`The cargo ship was last recorded up at ${lastCargoTime}.`);
// 		} catch (error) {
// 			console.log(`Something went wrong: ${error}`)
// 		}
// 	}
// 	console.log(message.content);
// });

// client.on('message', message => {
// 	if (message.content === '!bradley' || '!brady' || '!apc' || '!tank') {
// 		try {
// 			lastBradleyTime = timeNow;
// 			message.channel.send(`The Bradley APC spawn time has been set to: ${lastBradleyTime}. To check this time in the future, type the command ?bradley.`);
// 		} catch (error) {
// 			console.log(`Something went wrong: ${error}`)
// 		}
// 	}
// 	console.log(message.content);
// });

// client.on('message', message => {
// 	if (message.content === '?bradley' || '?brady' || '?apc' || '?tank') {
// 		try {
// 			message.channel.send(`The Bradley APC was last recorded up at ${lastBradleyTime}.`);
// 		} catch (error) {
// 			console.log(`Something went wrong: ${error}`)
// 		}
// 	}
// 	console.log(message.content);
// });

client.login(TOKEN);