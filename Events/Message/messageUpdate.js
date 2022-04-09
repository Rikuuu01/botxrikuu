const { MessageEmbed, Message, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     * @param {GuildMember} member 
     * @returns 
     */
    execute(oldMessage, newMessage, member) {
        const { guild } = member;
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? "..." : "");


        const Log = new MessageEmbed()
        .setColor("#ffea00")
        .setDescription(`Message from ${newMessage.author} has been **edited**.\n
        ✏️ **Old message**:\n ┕ \`${Original}\` \n\n 🖋️ **New message**:\n  ┕ \`${Edited}\`\n 
        #️⃣ **From channel**\n ┕ ${newMessage.channel}`.slice("0", "4096"))
        .setFooter(`${newMessage.author.tag}`)
        .addFields(
            { name: '\u200B', value: '\`Suport Me!!!\`' },
        )
        .setTimestamp()

        new WebhookClient({url: "https://discord.com/api/webhooks/912343297622675476/PRQN0IViYEeY6Nf_T_uVUJAHboySX4lVQE2BkNiP2pNzu-qVr_IXTCEb2mVyIIwq__ax"}
        ).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}