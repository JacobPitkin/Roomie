const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('skip')
	.setDescription('Skips the current track.'),
	async execute(interaction) {
    await audioPlayer.skip(interaction);
	},
};