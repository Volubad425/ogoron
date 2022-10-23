const Discord = require('discord.js');

module.exports = async function(client) {
    console.log(`Connecté : ${client.user.tag}`);
    client.user.setPresence({activities: [{name: '[OGORON : ACTUELLEMENT EN DEVELOPPEMENT] | /help', type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/oooooo"}], status: "dnd"});
}