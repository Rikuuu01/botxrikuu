const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { off } = require("../../Structures");
const https = require("https");

module.exports = {
    name: "volume",
    description: "Volume options",
    options: [
        { name: "set",description: "Alter the volume",type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 - 100%", type: "NUMBER", required: true}]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be voice channel", ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "set" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("#d40000")
                        .setDescription(`You have to specify a number betwen 1 dan 100`)]})

                    client.distube.setVolume(VoiceChannel, Volume)
                    return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("#d40000")
                        .setDescription(`volume has been set to \`${Volume}%\``)]})
                }
                return;
            }
        } catch (err) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` alert: ${err}`)
            return interaction.reply({embeds: [errorEmbed] })
        }
    }
}