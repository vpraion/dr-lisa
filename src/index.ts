require('dotenv').config();
import Discord from 'discord.js';
import { Commands } from './commands';

const Bot = new Discord.Client(
    {
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
        ]
    }
);

Bot.login(process.env.TOKEN);

// On message:
Bot.on('message', (message: Discord.Message) => {
    // If message.content matches a key in Commands:
    for (const key in Commands) {
        if (message.content.startsWith(key)) {
            // Run the function associated with the key:
            (Commands as any)[key](message);
        }
    }
});