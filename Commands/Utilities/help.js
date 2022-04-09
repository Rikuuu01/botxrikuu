const {MessageEmbed, CommandInteraction, GuildMember, Interaction} = require("discord.js");

module.exports = {
    name:  "help",
    description: "Option for help you",
    /**
     * 
     * @param {GuildMember} member 
     * @param {CommandInteraction} interaction 
     */
    execute(member, interaction) {
        const { user } = member;

        const Help = new MessageEmbed()
        .setColor("#00fbff")
        .setAuthor(user.tag)
        .setDescription(`Here i can help you!!!`)
        .setFooter(`ID: ${user.tag}`)
        .setFields(
            {
                name: `/clear`,
                value: `For delete message`,
                inline: false,
            }, 
        )
        .setTimestamp()

        interaction.reply({embeds: [Help]});
    }
}