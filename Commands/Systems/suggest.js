const { CommandInteraction, MessageEmbed } =  require("discord.js");

module.exports = {
    name: "suggest",
    description: "Create a sugestion",
    options: [
        {
            name: "type",
            description: "Select the type",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "System",
                    value: "System"
                },
            ]
        },
        {
            name: "name",
            description: "Provide a name for ypur suggestion.",
            type: "STRING",
            required: true

        },
        {
            name: "functionality",
            description: "Descript the functionality of this suugestion",
            type: "STRING",
            required: true

        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality")

        const Response = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${interaction.member} has suggested a ${type}.`)
        .addField("Name", `${name}`, true)
        .addField("functionality", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("🟢")
        message.react("🔴")

    }
}