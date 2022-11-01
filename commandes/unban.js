const Discord = require('discord.js');
const config = require('../config.js');

module.exports = {
    name: "unban",
    type: "moderation",
    description: `**Permet de débannir un utilisateur**\nSyntaxe : \`${config.prefix}unban [utilisateur] ([raison])\``,
    
    async run(client, message, args){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply("❌ **Vous n'avez pas la permission d'utiliser cette commande !**");
        else if(!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply("❌ **Je n'ai pas la permission d'exécuter cette commande !**");

        let target;

        try{
            target = await client.users.fetch(args[0]);
        }catch(err){
            console.error(err);
            return message.reply("❌ **Veuillez saisir un utilisateur !**");
        }

        try{
            await message.guild.members.unban(target.id);
            message.channel.send(`✅ **${target.username}#${target.discriminator} a été débanni.**`);
            message.delete();
        }catch(err){
            console.error(err);
            message.reply(`❌ **Cet utilisateur n'est pas banni !**`)
        }
    }
};