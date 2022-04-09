const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Create a poll",
    usage: "/poll",
    permission: "ADMINISTRATOR",
    options: [
      {
        name: "poll1",
        description: "Describe the poll you want to make.",
        type: "STRING",
        required: true
      }, 
      {
        name: "poll2",
        description: "Describe the poll you want to make.",
        type: "STRING",
        required: true
      }, 
      {
        name: "image1",
        description: "Select a channel to send the message to.",
        type: "STRING",
        required: true
      },
      {
        name: "image2",
        description: "Select a channel to send the message to.",
        type: "STRING",
        required: true
      },
      {
        name: "channel",
        description: "Select a channel to send the message to.",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
      },    
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        
        const { options } = interaction;

        const poll1 = options.getString("poll1");
        const poll2 = options.getString("poll2");
        const image1 = options.getString("image1");
        const image2 = options.getString("image2");
        const gChannel = options.getChannel("channel") || interaction.channel;

        const pollEmbed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Dibantu Pilih ...")
            .setDescription(`✅${poll1}
            ☑️${poll2}`)
            .setFooter("mohon dipilih")
            .setTimestamp()

        const embed1 = new MessageEmbed().setURL('https://www.google.com/').setImage(`${image1}`)
        const embed2 = new MessageEmbed().setURL('https://www.google.com/').setImage(`${image2}`)

        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [pollEmbed, embed1, embed2]});
        sendMessage.react("👍")
        sendMessage.react("👎")
        sendMessage.react("💀")

        interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`The poll was successfully sent to ${gChannel} ✅`)],ephemeral: true})
    }
}