const { SlashCommandBuilder } = require('@discordjs/builders');
const audioPlayer = require('../managers/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
  .setName('play')
  .setDescription('Queues a song to play.')
  .addStringOption(option =>
    option.setName('search')
    .setDescription('The name of the audio you would like to play.')
    .setRequired(true)),
	async execute(interaction) {
    audioPlayer.play(interaction);
	},
};