const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { off } = require("../../Structures");
const https = require("https");

module.exports = {
    name: "p",
    description: "Complete music system",
    options: [
        { name: "music",description: "play a song",type: "SUB_COMMAND",
            options: [{ name: "title", description: "Provide a name or url for the song", type: "STRING", required: true}]
        },
        { name: "more",description: "Select an options",type: "SUB_COMMAND",
             options: [{ name: "options", description: "Select an option.", type: "STRING", required: true,
            choices: [
                {name: "▶️ Resume Song", value: "resume"},
                {name: "⏸️ Pause Song", value: "pause"},
                {name: "⏭️ Skip Song", value: "skip"},
                {name: "⏹️ Stop Music", value: "stop"},
                {name: "🔢 View Queue", value: "queue"},
                {name: "🔀 Shuffle Queue", value: "shuffle"},
                {name: "🔃 Toggle loop Modes", value: "AutoPlay"},
                {name: "🔁 Toggle Repeat Mode", value: "RepeatMode"},
                {name: "🈁 Add a Related Song", value: "RelatedSong"},
            ]}]
        }
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

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `im already playing music <#${guild.me.voice.channelId}>`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "music" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("title"), { textChannel: channel, member: member});
                    return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("#4287f5")
                        .setDescription(`🔎 Searching for song requested`)]})
                }
                case "more" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("#d40000")
                        .setDescription(`⛔ Nothing playlist`)]})

                    switch(options.getString("options")) {
                        case "skip" :
                        await queue.skip(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#d40000")
                            .setDescription("⏭️ Song has been skiped.")]})

                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#d40000")
                            .setDescription("⏹️ Song has been stop.")]})

                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#d40000")
                            .setDescription("⏹️ Song has been paused.")]})

                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#008f13")
                            .setDescription("▶️ Song has been resume.")]})

                        case "shuffle" :
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#cf9100")
                            .setDescription("🔀 The queue has been shuffled.")]})           

                        case "AutoPlay" :
                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#cf9100")
                            .setDescription(`🔃 Queue loop set to \`${Mode ? "ON" : "OFF"}\``)]}) 

                        case "RelatedSong" :
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#008f13")
                            .setDescription("🈁 1 Related song has been added to the queue!")]})    

                        case "RepeatMode" :
                        let Mode2 = await client.distube.setRepeatMode(queue);
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("#cf9100")
                            .setDescription(`🔃 Repeat mode is set to \`${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}\``)]})    

                        case "queue":
                        return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("PURPLE")
                            .setDescription(`${queue.songs.map(
                                (song, id) => `\n**${id + 1}**. ${song.name} \n┕ \`${song.formattedDuration}\` - ${song.user}`)}`
                            )
                            .setTimestamp()
                            ]});
                    }
                    return;
                }
            }
        } catch (err) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` alert: ${err}`)
            return interaction.reply({embeds: [errorEmbed] })
        }
    }
}