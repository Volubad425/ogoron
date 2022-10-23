const Discord = require('discord.js');

module.exports = {
    name: "info",
    
    async run(client, message){
        const embed = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle("Ogoron")
            .setTimestamp()
            .addFields(
                { name: 'Propriétaire :', value: `\`MoMO\``},
                { name: 'Créateur du bot :', value: `\`Volubad\``},
            )
        await message.channel.send({embeds: [embed]});
    }
};