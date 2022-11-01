const Discord = require('discord.js');
const config = require('../config.js');

module.exports = {
    name: "ban",
    type: "moderation",
    description: `**Permet de bannir un utilisateur du serveur**\nSyntaxe : \`${config.prefix}ban [utilisateur] ([raison])\``,
    
    async run(client, message, args){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply("❌ **Vous n'avez pas la permission d'utiliser cette commande !**");
        else if(!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply("❌ **Je n'ai pas la permission d'exécuter cette commande !**");

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
        }
        
        if(member){
            if(member.user.id === client.user.id) return message.reply("😂 **MDRRRR tu veux me ban moi ?**");
            else if(member.user.id === message.author.id) return message.reply("❌ **Vous ne pouvez pas vous auto-bannir !**");
            else if(member.user.id === message.guild.ownerId) return message.reply("❌ **Vous ne pouvez pas bannir le propriétaire du serveur !**");
            else if(member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply("❌ **Cet utilisateur est administrateur du serveur !**");
            else if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("❌ **L'utilisateur que vous voulez bannir a un rôle égal ou supérieur au votre !**");
            else if(member.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.reply("❌ **L'utilisateur que vous voulez bannir a un rôle égal ou supérieur au mien !**");
        }

        let raison = args[1] || "Aucune raison fournie";
        target.send(`ℹ️ Vous avez été banni de **${message.guild.name}**. \`Raison : ${raison}\``).catch(err => console.log(err));
        setTimeout(async function(){
            await message.guild.members.ban(target.id, {reason: `${raison} (Banni par ${message.author.username}#${message.author.discriminator})`})
                .then(message.channel.send(`✅ **${target.username}#${target.discriminator} a été banni.** \`Raison : ${raison}\``));
        },500);
        message.delete();
    }
};