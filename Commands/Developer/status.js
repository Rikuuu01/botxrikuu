const { CommandInteraction ,Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "Display status",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Client**: \`🟢 onnline\` - \`${client.ws.ping}ms\`\n **UpTime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Database**: \`${swicthTo(connection.readyState)}\``)

        interaction.reply({embeds: [Response]})
    }
}

function swicthTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECT`
        break;
        case 1 : status = `🟢 CONNECT`
        break;
        case 2 : status = `🟠 CONNECTING`
        break;
        case 3 : status = `⚫ DISCONNECTING`
        break;
    }
    return status;
}
