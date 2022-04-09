const {MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name:  "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        member.roles.add("913442447298805820");
        const Welcomer = new WebhookClient({
            id: "912243969415598100",
            token: "xPRJilMjpqmMHTwPFF5cfXlvtsbSjfffCVy2U_tt2SP4ICo3WR8gxr5uGp9eJ1uUAzPK"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(user.tag)
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\nHope you enjoy being on this server!!!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest member Count: **${guild.memberCount}**\n`)
        .setFooter(`ID: ${user.tag}`)
        .setFields(
            {
                name: `:pencil: Jadwwal Kuliah`,
                value: `<#910720288264695859>`,
                inline: true,
            },
            {
                name: `:link: Link Discord`,
                value: `<#899881021271580682>`,
                inline: true,
            },
            {
                name: `:pencil: Take Role`,
                value: `<#908936322633318470>`,
                inline: true,
            },   
        )
        .setTimestamp()

        Welcomer.send({embeds: [Welcome]})
    }
}