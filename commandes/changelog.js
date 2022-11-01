const Discord = require('discord.js');
const moment = require('moment/moment');
const config = require('../config.js');

module.exports = {
    name: "changelog",
    type: "",
    description: `**Permet de poster ou de modifier un changelog**\nSyntaxe : \`${config.prefix}changelog post [message]\`, \`${config.prefix}changelog update [id message] [message]\``,
    
    async run(client, message, args){
        if(message.author.id === "456767227920908289"){
            const date = moment().format('DD/MM/YYYY');

            if(args[0] === "post"){
                let content = args.join(" ").slice(args[0].length + 1);
                if(!content) return message.reply("❌ **Veuillez saisir un message à poster !**");

                const embed = new Discord.EmbedBuilder()
                    .setTitle(`🪛 **Changelog du ${date}**`)
                    .setDescription(`\`${content}\``)
                    .setTimestamp()
                    .setFooter({text: `Auteur : ${message.author.username}#${message.author.discriminator}`});
                
                try{
                    await client.channels.cache.get("1036364577434251455").send({embeds: [embed]});
                }
                catch(err){
                    console.log(err);
                    return message.reply("❌ **Une erreur est survenue lors du post du changelog !**");
                }

                message.channel.send("✅ **Changelog posté.**");
                message.delete();
                
            }
            else if(args[0] === "update"){
                if(!args[1]) return message.reply("❌ **Veuillez indiquer un message a modifier !**");
                let content = args.join(" ").slice((args[0].length + 1) + (args[1].length + 1));
                if(!content) return message.reply("❌ **Veuillez saisir un message à poster !**");

                let msg;

                try{
                    msg = await client.channels.cache.get("1036364577434251455").messages.fetch(args[1]);
                }
                catch(err){
                    console.log(err);
                    return message.reply("❌ **Le message est introuvable !**");
                }
                
                const embed = new Discord.EmbedBuilder()
                    .setTitle(msg.embeds[0].title)
                    .setDescription(`\`${content}\``)
                    .setTimestamp()
                    .setFooter({text: `Auteur : ${message.author.username}#${message.author.discriminator}`});

                msg.edit({embeds: [embed]});
                message.channel.send("✅ **Contenu du changelog modifié.**");
                message.delete();
            }
        }
    }
}