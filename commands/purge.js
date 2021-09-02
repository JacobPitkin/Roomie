const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('purge')
	.setDescription('Purges messages from channel.')
  .addIntegerOption(option =>
    option.setName('messages')
    .setDescription('The number of messages to remove.')
    .setRequired(true)),
	async execute(interaction) {
    interaction.reply({ content: 'LOL, wish I could figure out how this command should work. Honestly just waiting till I can figure out how to unregister this command. All the others should work though!', ephemeral: true });
	},
};