require(`dotenv`).config();
import { Client } from 'discord.js';
const client = new Client();
const TOKEN = process.env.TOKEN;

const commandPrefix = `!`;

let lastHeliTime;
let lastCargoTime;
let lastBradleyTime;

client.once(`ready`, () => {
	console.log(`Mr. Naked is at your command.`);
});

client.on(`message`, message => {
	const commandArgs = message.content.slice(commandPrefix.length).split(/ +/);
	const command = commandArgs.shift().toLowerCase();

	const timeNow = new Date().toLocaleTimeString(`en-US`);

	if (!message.content.startsWith(commandPrefix) || message.author.bot) return;
	// Commands
	else if (command === `setheli`) {
		lastHeliTime = timeNow;
		message.channel.send(`The heli spawn time has been set to: ${lastHeliTime}. To check this time later, type the question ?heli.`);
	} else if (command === `setcargo`) {
		lastCargoTime = timeNow;
		message.channel.send(`The cargo spawn time has been set to: ${lastCargoTime}. To check this time later, type the question ?cargo.`);
	} else if (command === `setbradley`) {
		lastBradleyTime = timeNow;
		message.channel.send(`The bradley spawn time has been set to: ${lastBradleyTime}. To check this time later, type the question ?bradley.`);
		// eslint-disable-next-line brace-style
	}

	// Questions
	else if (command === `heli`) {
		message.channel.send(`The heli was last up at ${lastHeliTime}.`);
	} else if (command === `cargo`) {
		message.channel.send(`The heli was last up at ${lastCargoTime}.`);
	} else if (command === `bradley`) {
		message.channel.send(`The heli was last up at ${lastBradleyTime}.`);
	}
});

client.login(TOKEN);
