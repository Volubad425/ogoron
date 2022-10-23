const Discord = require('discord.js');

module.exports = {
    name: "ping",
    
    async run(client, message){
        const ping = new Date() - message.createdTimestamp;
        const embed = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle("🏓 Pong !")
            .addFields(
                { name: 'Latence :', value: `\`${ping}ms\``},
                { name: 'API :', value: `\`${client.ws.ping}ms\``},
            )
        await message.channel.send({embeds: [embed]});
    }
};