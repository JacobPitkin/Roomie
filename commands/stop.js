const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('stop')
	.setDescription('Stops playing audio.'),
	async execute(interaction) {
    await audioPlayer.stop(interaction);
	},
};