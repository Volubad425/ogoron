const Discord = require('discord.js');

module.exports = {
    name: "help",
    
    async run(client, message){
        const embed = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle("Liste des commandes")
            .setDescription(`⚠️ **Le bot est actuellement en développement**\n\n**Prefix :** \`${process.env.PREFIX}\` \nVeuillez saisir \`${process.env.PREFIX}help [commande]\` pour en savoir plus`)
            .setTimestamp()
            .addFields(
                { name: 'Moderation :', value: 'Aucune commande n\'est disponible'},
                { name: 'Administrateur :', value: 'Aucune commande n\'est disponible'},
                { name: 'Utilitaire', value: '`ping`'},
                { name: 'Experience :', value: 'Aucune commande n\'est disponible'},
                { name: 'Fun :', value: 'Aucune commande n\'est disponible'},
            )
        await message.channel.send({embeds: [embed]});
    }
};