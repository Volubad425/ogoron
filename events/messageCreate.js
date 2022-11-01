const Discord = require('discord.js');
const config = require('../config.js');

module.exports = async function(client, message){
    let prefix = config.prefix;

    if(!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);


    let cmd = client.commands.get(command);
    if(!cmd) return;

    cmd.run(client, message, args);
}