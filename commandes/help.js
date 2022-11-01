const Discord = require('discord.js');
const config = require('../config.js');
const fs = require('fs');

module.exports = {
    name: "help",
    type: "",
    description: `**Permet de connaitre la liste des commandes disponibles**\nSyntaxe : \`${config.prefix}help\``,
    
    async run(client, message, args){
        if(args[0]){
            function getDescription(str){
                let result = null;

                fs.readdirSync('./commandes/').filter(f => f.endsWith(".js")).forEach(async function(file){
                    let props = require(`./${file}`);
                    if(str === props.name){
                        result = props.description;
                    }
                });

                return result;
            }

            let desc = getDescription(args[0]);
            
            if(desc != null){
                const embed = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle(`❓ Commande ${args[0]}`)
                    .setDescription(`${desc}`)
                    .setTimestamp()
                message.channel.send({embeds: [embed]});
            }
            else{
                message.reply("❌ **Cette commande n'existe pas !**");
            }
        }
        else{
            let modCmd = "";
            let utilCmd = "";
            let xpCmd = "";
            let funCmd = "";

            console.log(fs.readdirSync('./commandes/'));

            fs.readdirSync('./commandes/').filter(f => f.endsWith(".js")).forEach(async function(file){
                let props = require(`./${file}`);
                if(props.type == "moderation")
                    modCmd = modCmd + `\`${props.name}\`, `;
                if(props.type == "utilitaire")
                    utilCmd = utilCmd + `\`${props.name}\`, `;
                if(props.type == "experience")
                    xpCmd = xpCmd + `\`${props.name}\`, `;
                if(props.type == "fun")
                    funCmd = funCmd + `\`${props.name}\`, `;
            });

            modCmd = modCmd.slice(0, modCmd.length - 2);
            utilCmd = utilCmd.slice(0, utilCmd.length - 2);
            xpCmd = xpCmd.slice(0, xpCmd.length - 2);
            funCmd = funCmd.slice(0, funCmd.length - 2);

            const embed = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("❓ Liste des commandes")
                .setDescription(`⚠️ **Le bot est actuellement en développement**\n\n**Prefix :** \`${config.prefix}\` \nVeuillez saisir \`${config.prefix}help [nom commande]\` pour en savoir plus`)
                .setTimestamp()
                .addFields(
                    { name: 'Moderation :', value: modCmd === "" ? "Aucune commande disponible" : modCmd},
                    { name: 'Utilitaire', value: utilCmd === "" ? "Aucune commande disponible" : utilCmd},
                    { name: 'Experience :', value: xpCmd === "" ? "Aucune commande disponible" : mxpCmd},
                    { name: 'Fun :', value: funCmd === "" ? "Aucune commande disponible" : funCmd},
                )
                message.channel.send({embeds: [embed]});
            }
    }
};