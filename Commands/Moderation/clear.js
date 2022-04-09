const {CommandInteraction, MessageEmbed} = require("discord.js");
const { options } = require("../Systems/suggest");

module.exports = {
    name: "clear",
    description: "Delete a specified number of message from a channel or a target",
    Permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "How many message wnat to delete?",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "target",
            type: "USER",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction

        const Amount = options.getNumber("amount");
        const Target = options.getUser("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`Clear ${messages.size} from ${Target}.`);
                interaction.reply({embeds: [Response]});

            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`Clear ${messages.size} from this channel.`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}