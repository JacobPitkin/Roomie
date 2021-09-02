const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');
const { guildId } = require('../config.json');

let audioQueue;
let player;
let timeout;

const init = async (client) => {
  if (player) return;

  player = new Player(client);

  player.on('trackStart', (q, track) => {
    clearTimeout(timeout);

    const embed = new MessageEmbed()
    .setColor('#7226ed')
    .setTitle('Now Playing')
    .setDescription(`${track.title}\n${track.url}`)
    .setFooter(`Requested by ${client.guilds.cache.find(i => i.id === guildId).members.cache.find(j => j.id === track.requestedBy.id).nickname}`);

    q.metadata.channel.send({ embeds: [embed] });
  });

  player.on('queueEnd', () => timeout = setTimeout(() => audioQueue.destroy(), 5 * 60000));
}

const clear = async (interaction) => {
  audioQueue.clear();
  interaction.channel.send('Audio queue has been cleared.');
}

const play = async (interaction) => {
  if (!interaction.member.voice.channelId) return await interaction.reply({ content: 'You must be in a voice channel!', ephemeral: true });
  if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

  const query = interaction.options.getString('search');

  if (audioQueue) {
    await interaction.deferReply();
    const track = await player.search(query, {
      requestedBy: interaction.user
    })
    .then(x => x.tracks[0]);

    if (!track) return await interaction.followUp({ content: `Track '${query}' could not be found!` });

    audioQueue.addTrack(track);
    return await interaction.followUp({ content: `Queued '${track.title} - ${track.url}'`});
  }

  audioQueue = player.createQueue(interaction.guild, {
    metadata: {
      channel: interaction.channel
    },
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    initialVolume: 40
  });

  try {
    if (!audioQueue.connection) await audioQueue.connect(interaction.member.voice.channel);
  } catch {
    audioQueue.destroy();
    return await interaction.reply({ content: 'Could not join your voice channel!', ephemeral: true });
  }

  await interaction.deferReply();
  const track = await player.search(query, {
    requestedBy: interaction.user
  })
  .then(x => x.tracks[0]);

  if (!track) return await interaction.followUp({ content: `Track '${query}' could not be found!` });

  audioQueue.play(track);
  return await interaction.followUp({ content: `Queued '${track.title} - ${track.url}'`});
}

const queue = async (interaction) => {
  interaction.reply({ content: 'Checking the tracks...', ephermeral: true });
  const nowPlaying = audioQueue.nowPlaying();

  let message = `**Now Playing:**\n\n${nowPlaying.title} - ${track.url}\n\n**Upcoming:**\n`;

  audioQueue.tracks.forEach(track => message += `\n${track.title} - ${track.url}`);

  const embed = new MessageEmbed()
  .setColor('#1c8f18')
  .setDescription(message);

  interaction.channel.send({ embeds: [embed] });
}

const skip = async (interaction) => {
  audioQueue.skip();
  return await interaction.channel.send('Skipped track.');
}

const stop = async (interaction) => {
  audioQueue.stop();
  return await interaction.channel.send('Stopped playing audio.');
}

const volume = async (interaction) => {
  const volume = interaction.options.getInteger('volume');

  if (volume > 100 || volume < 0) return interaction.reply({ content: 'Volume can only be set to values 0-100.', ephemeral: true });

  audioQueue.setVolume(volume);
  interaction.reply({ content: `Volume has been set to ${volume}`, ephemeral: true });
  return await interaction.channel.send(`Player volume has been set to ${volume}`);
}

module.exports = {
  clear,
  init,
  play,
  queue,
  skip,
  stop,
  volume
};