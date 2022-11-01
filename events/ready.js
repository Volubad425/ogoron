const Discord = require('discord.js');
const config = require('../config.js');

module.exports = async function(client, message) {
    const status = [
        { type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/oooooo", name: `${config.prefix}help` },
        { type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/oooooo", name: `🔨 Actuellement en développement` },
        { type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/oooooo", name: `${client.guilds.cache.get("1033103427137458216").memberCount} membres` }
    ]
    console.log(`Connecté : ${client.user.tag}`);
    setInterval(function(){
        const index = Math.floor(Math.random() * (status.length - 1) + 1);
        client.user.setPresence({activities: [{name: status[index].name, type: status[index].type, url: status[index].url}], status: "dnd"});
    }, 10000);
}