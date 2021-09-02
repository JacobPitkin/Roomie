# Roomie Bot

This is a project I created for a discord server between a few friends and myself. This is the third iteration, but was so different that I decided to make a new project for it. Originally, the bot would just join a voice channel and play some YouTube sound defined in a sounds file and then leave, kind of as a meme joke, you know playing something like ["It's Brittany, Bitch" by Michael Scott](https://www.youtube.com/watch?v=e2HkUnXeE_k) when someone joins to get a laugh. Over time it started taking on a role as a music bot as well, like Groovy or Rhythm. This caused me to rethink how I was coding some of the bot, and mid restructure discord.js changed how they wanted commands to be handled. So this was a good opportunity for me to create this third iteration, which works through slash commands and has a dedicated audio management file.

At this point join sounds haven't been added, I've been working on the audio player functionality mostly since I believe having a good foundation with that will make it easier for me to integrate the join sounds rather than vice versa. In the future the core component of why I created the bot will be in place, but for now I'm having fun trying to clean up the current audio implementations and even create more functionality with it.

To get this bot up and running on your own server, you'll need make sure you have [node.js](https://nodejs.org/en/download/) installed, and to create a bot under your own development profile with Discord. Then host this program on either your local machine or hosted somewhere else (which I'll leave that up to you). Following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) will help you get a bot set up to run this program. The only other thing you'll need is a `config.json` file, since that's where you'll be pulling in the bot token, guild ID, and client ID.

Your file should look something like this:

```json
{
  "clientId": "<client_id>",
  "guildId": "<guild_id>",
  "token": "<bot_token>"
}
```

`clientId` refers to the bots user ID, `guildId` refers to your server ID, and `token` is your bot token, which you'll find in your development portal where you set your bot up. The client and guild ID's can be found by activating developer mode in your Discord client and then right clicking on the bot after it's been added to your server and copying it's ID from the drop down. Same thing works for the guild ID and your server.

Before starting the bot, run the commands `npm install` and then `node deploy-commands.js` in your terminal on the project folder. This will ensure that your server has access to the commands. I had tried making these global commands so this wouldn't have to be done but was having issues with them being recognized, so this is my temporary solution. Especially since this bot was only really meant to run on a single server anyways.


## Known issues

The bot works with YouTube, Spotify and SoundCloud through the `discord-player` library, but it only works with single tracks. I had tried adding a Spotify playlist, but it only takes the first track in that playlist. Might be something I work on in the future since that'd be nice to have, but we'll see if/when I get around to it.