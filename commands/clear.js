const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears the audio queue.'),
	async execute(interaction) {
    await audioPlayer.clear(interaction);
	},
};