const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.js');

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.DirectMessageReactions
]});

client.commands = new Discord.Collection();

fs.readdirSync('./commandes/').filter(f => f.endsWith(".js")).forEach(async function(file){
    let command = require(`./commandes/${file}`);
    client.commands.set(command.name, command);
    console.log(`Commande chargée : [${file}]`);
});

fs.readdirSync('./events/').filter(f => f.endsWith(".js")).forEach(async function(file){
    let event = require(`./events/${file}`);
    client.on(file.split(".js").join(""), event.bind(null, client))
    console.log(`Evenement chargé : [${file}]`);
});

client.login(config.token);