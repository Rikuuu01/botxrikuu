const { CommandInteraction, MessageEmbed, WebhookClient} = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "announce",
    description: "Announces whatever you want to announce in the announcement channel.",
    options: [
        {
            name: "matakuliah",
            description: "Masukan MataKuliah",
            type: "STRING",
            required: true
        },
        {
            name: "semester",
            description: "Masukan Semester Ke-",
            type: "STRING",
            required: true
        },
        {
            name: "judul",
            description: "Pertemuan Ke-",
            type: "STRING",
            required: true
        },
        {
            name: "pertemuan",
            description: "Masukan Type File",
            type: "STRING",
            required: true
        },
        {
            name: "tanggal",
            description: "Masukan Type File",
            type: "STRING",
            required: true
        },
        {
            name: "type",
            description: "Masukan Type File",
            type: "STRING",
            required: true
        },
        {
            name: "link",
            description: "Masukan Type File",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        
        interaction.reply({content: "Sending announcement...", ephemeral: true})

        const announcer = new WebhookClient({
            url : "https://discord.com/api/webhooks/956510058181693470/AVbwccuD0gx7KBszWw6KiIJ75pzBPWVW6GRTuLQbfAm4miuPTRZXPHgnTtLhPl-rp3Cj"
        });

        const matakuliah = interaction.options.getString("matakuliah");
        const semester = interaction.options.getString("semester");
        const judul = interaction.options.getString("judul");
        const pertemuan = interaction.options.getString("pertemuan");
        const tanggal = interaction.options.getString("tanggal");
        const type = interaction.options.getString("type");
        const link = interaction.options.getString("link");

        const data = new SlashCommandBuilder()
	    .setName('info')
	    .setDescription('Get info about a user or a server!')
	    .addSubcommand(subcommand =>
		    subcommand
			    .setName('user')
			    .setDescription('Info about a user')
			    .addUserOption(option => option.setName('target').setDescription('The user')))

        const announcement = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('AutoUpate Modul')
        .setThumbnail(`https://gokimhock.files.wordpress.com/2012/05/upi-copy.jpg`)
        .setDescription(`Mata Kuliah : **${matakuliah}**
        Semester Ke-**${semester}**\n
        Pertemuan Ke-**${pertemuan}**
        Judul       : **${judul}**
        Tanggal     : **${tanggal}**
        Type Data   : **${type}**\n`)
        .addField("Link", `[Click here](${link})`)
        .setTimestamp()

        announcer.send({content: data, embeds: [announcement]})

    }
}


