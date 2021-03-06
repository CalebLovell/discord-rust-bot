require(`dotenv`).config();
const Discord = require(`discord.js`);
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

const scrapeItem = require(`./itemScraper.js`);
const getAllRustItems = require(`./rustItems.js`);

const commandPrefix = `!`;

let lastHeliTime;
let lastCargoTime;
let lastBradleyTime;
let rustItemArray;

client.once(`ready`, async () => {
	rustItemArray = await getAllRustItems();
	console.log(`Mr. Naked is at your command.`);
});

client.on(`message`, async message => {
	// const commandArgs = message.content.slice(commandPrefix.length).split(/ +/);
	// const command = commandArgs.shift().toLowerCase();
	const command = message.content.substring(1).toLowerCase();

	// TODO: fix above mess ^

	const timeNow = new Date().toLocaleTimeString(`en-US`);

	if (!message.content.startsWith(commandPrefix) || message.author.bot) return;
	// Commands
	else if (command === `setheli`) {
		lastHeliTime = timeNow;
		message.channel.send(`\`\`\`prolog\nthe heli spawn time has been set to: ${lastHeliTime}, to check this time later, type '!heli'\`\`\``);
	} else if (command === `setcargo`) {
		lastCargoTime = timeNow;
		message.channel.send(`\`\`\`prolog\nthe cargo spawn time has been set to: ${lastCargoTime}, to check this time later, type '!cargo'\`\`\``);
	} else if (command === `setbradley`) {
		lastBradleyTime = timeNow;
		message.channel.send(`\`\`\`prolog\nthe bradley spawn time has been set to: ${lastBradleyTime}, to check this time later, type '!bradley'\`\`\``);
	}

	// Questions
	else if (command === `heli`) {
		message.channel.send(`\`\`\`prolog\nthe heli was last up at ${lastHeliTime}.\`\`\``);
	} else if (command === `cargo`) {
		message.channel.send(`\`\`\`prolog\nthe heli was last up at ${lastCargoTime}.\`\`\``);
	} else if (command === `bradley`) {
		message.channel.send(`\`\`\`prolog\nthe heli was last up at ${lastBradleyTime}.\`\`\``);
	}

	// Find Item Info
	else if (rustItemArray.includes(command)) {
		const urlFormattedItem = command.split(/\s+/).join(`-`);
		const itemInfoObj = await scrapeItem(`https://rustlabs.com/item/${urlFormattedItem}`);
		message.channel.send(`\`\`\`prolog\n${itemInfoObj.researchCost}\n${itemInfoObj.craftCost}\`\`\``);
	}
});

client.login(TOKEN);
