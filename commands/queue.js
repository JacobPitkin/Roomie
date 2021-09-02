const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('queue')
	.setDescription('View the currently playing audio, as well as what\s up next.'),
	async execute(interaction) {
    await audioPlayer.queue(interaction);
	},
};