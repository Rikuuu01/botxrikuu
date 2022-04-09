const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("#4287f5")
        .setDescription(`**Playing** : \`${song.name}\` - \`${song.formattedDuration}\`\n
        Requested by: ${song.user}\n${status(queue)}`)
        .setFooter(`#ENJOYTHEPROCESS`)
        .setTimestamp()
    ]}))

    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("#1cff49")
        .setDescription(`**Added** : \`${song.name}\` - \`${song.formattedDuration}\`\n
        add by ${song.user}`)
        .setTimestamp()
    ]}))

    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        .setTimestamp()
    ]}))

    .on("error", (channel, e) => {
        channel.send(`An error encountered: ${e}`)
        console.error(e)
    })

    .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`Voice channel is empty, leave the channel`)
    ]}))

    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`No results found`)
    ]}))

    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`🗒️Queue finished`)
    ]}))