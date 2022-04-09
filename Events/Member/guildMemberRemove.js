const {MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name:  "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        const Leave = new WebhookClient({
            id: "912250553017458698",
            token: "L1Ofm5H1N88J5aKGgSOGvwdvxswC88FZ5eJCU85c3vrNbsTJEQiUna8FOi3HzWQ7uINF"
        });

        const Leavee = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the server!\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()

        Leave.send({embeds: [Leavee]})
    }
}