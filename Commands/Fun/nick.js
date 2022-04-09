const  { MessageEmbed, CommandInteraction } = require("discord.js");


module.exports = {
    name: "nick",
    description: "Changes the nickname of the provided user",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Select a target to change the nickname of",
            type: "USER",
            required: true 
        },
        { 
            name: "nickname",
            description: "Type a nickname",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { options } = interaction;
        const target = options.getMember("target");
        const nick = options.getString("nickname");

        target.setNickname(nick)

        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN").setDescription(`✅ You Successfully changed the nickname`)]})

    }
}