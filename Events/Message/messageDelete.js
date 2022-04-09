const { MessageEmbed, Message, WebhookClient, Channel} = require("discord.js");

module.exports = {
    name: "messageDelete",
   /**
    * 
    * @param {Message} message 
    */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`Meessage from ${message.author} has been  **deleted**.\n
        🗑️ **Message Deleted**\n ┕ \`${message.content ? message.content : "None"}\`\n
        #️⃣ **From channel**\n ┕ ${message.channel}`.slice(0, 4096))
        .setFooter(`${message.author.tag}`)
        .addFields(
            { name: '\u200B', value: '\`Suport Me!!!\`' },
        )
        .setTimestamp()

        if(message.attachments.size >= 1) {
            Log.addField(`Attachment:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/912343297622675476/PRQN0IViYEeY6Nf_T_uVUJAHboySX4lVQE2BkNiP2pNzu-qVr_IXTCEb2mVyIIwq__ax"}
        ).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}