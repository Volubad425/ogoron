const Discord = require('discord.js');
const config = require('../config.js');

module.exports = {
    name: "ping",
    type: "utilitaire",
    description: `**Permet de connaitre le ping du bot**\nSyntaxe : \`${config.prefix}ping\``,
    
    async run(client, message){
        const ping = new Date() - message.createdTimestamp;
        const embed = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle("🏓 Pong !")
            .setTimestamp()
            .addFields(
                { name: 'Latence :', value: `\`${ping}ms\``},
                { name: 'API :', value: `\`${client.ws.ping}ms\``},
            )
        message.channel.send({embeds: [embed]});
    }
};