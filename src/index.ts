require('dotenv').config();
import Discord from 'discord.js';

const Bot = new Discord.Client(
    {
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS'
        ]
    }
);

Bot.login(process.env.TOKEN);