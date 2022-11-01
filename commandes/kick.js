const Discord = require('discord.js');
const config = require('../config.js');

module.exports = {
    name: "kick",
    type: "moderation",
    description: `**Permet de bannir un utilisateur du serveur**\nSyntaxe : \`${config.prefix}kick [utilisateur] ([raison])\``,
    
    async run(client, message, args){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return message.reply("❌ **Vous n'avez pas la permission d'utiliser cette commande !**");
        else if(!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return message.reply("❌ **Je n'ai pas la permission d'exécuter cette commande !**");

        let target;

        try{
            target = message.mentions.users.first() || await client.users.fetch(args[0]);
        }catch(err){
            console.error(err);
            return message.reply("❌ **Veuillez saisir un utilisateur !**");
        }

        let member

        try{
            member = await message.guild.members.fetch(target.id);
        }catch(err){
            console.error(err);
            return message.reply("❌ **L'utilisateur n'est pas présent sur le serveur !**");
        }
        
        if(member.user.id === client.user.id) return message.reply("😂 **MDRRRR tu veux me kick moi ?**");
        else if(member.user.id === message.author.id) return message.reply("❌ **Vous ne pouvez pas vous auto-kick !**");
        else if(member.user.id === message.guild.ownerId) return message.reply("❌ **Vous ne pouvez pas kick le propriétaire du serveur !**");
        else if(member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply("❌ **Cet utilisateur est administrateur du serveur !**");
        else if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("❌ **L'utilisateur que vous voulez kick a un rôle égal ou supérieur au votre !**");
        else if(member.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.reply("❌ **L'utilisateur que vous voulez kick a un rôle égal ou supérieur au mien !**");

        let raison = args[1] || "Aucune raison fournie";
        target.send(`ℹ️ Vous avez été kick de **${message.guild.name}**. \`Raison : ${raison}\``).catch(err => console.log(err));
        setTimeout(function(){
            member.kick({reason: `${raison} (Kick par ${message.author.username}#${message.author.discriminator})`})
                .then(message.channel.send(`✅ **${target.username}#${target.discriminator} a été kick.** \`Raison : ${raison}\``));
        },500);
        message.delete();
    }
};