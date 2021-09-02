const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('volume')
	.setDescription('Sets the volume of the player.')
  .addIntegerOption(option =>
    option.setName('volume')
    .setDescription('The volume level to set the player to. (0 - 100, default is 40)')
    .setRequired(true)),
	async execute(interaction) {
    await audioPlayer.volume(interaction);
	},
};