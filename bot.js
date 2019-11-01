require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!vote') {
		message.reply('voting currently unavailable, sorry!');
	}
	console.log(message.content);
});

client.login(TOKEN);