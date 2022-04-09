const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dmuser",
  description: "Message a user with the bot",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "target",
      description: "Select a target",
      type: "USER",
      required: true,
    },
    {
      name: "message",
      description: "Provide the message you want the bot to send.",
      type: "STRING",
      required: true,
    },
  ],

  /**
   * @param {ClientInteraction} interaction
   */
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");

    const say = interaction.options.getString("message");

    if (target.id === client.user.id)
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`You can't **dm** ${client.user}.`)
            .setColor("#RED"),
        ],
        ephemeral: true,
      });

    if (target) {
      try {
        await target.send(say)
        return interaction.reply({
          content: "Message Sent",
          ephemeral: true,
        });
      } catch (err) {
        console.log(err);
        return interaction.reply({ content: "Something went wrong" })
      };
    };
  },
};
