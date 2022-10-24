const Discord = require('discord.js');
const fs = require("fs");

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
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

client.on("messageCreate", async function(message){
    let prefix = process.env.PREFIX;

    if(!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);


    let cmd = client.commands.get(command);
    if(!cmd) return message.reply("Cette commande n'existe pas");

    cmd.run(client, message, args);
});

client.login(process.env.TOKEN);