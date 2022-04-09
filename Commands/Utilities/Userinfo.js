const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "UserInfo",
    type: "USER",
    context: true,

    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        await target.user.fetch();

        const Response = new MessageEmbed()
        .setColor("GREY")
        .setAuthor(target.user.tag, target.user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}` )
        .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord user Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        
        interaction.reply({embeds: [Response], ephemeral: true})
    }
}