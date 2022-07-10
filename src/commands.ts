import Discord from 'discord.js'

export const Commands : {} = {
    "!ping" : function (message: Discord.Message): void {
        if (message.author.bot) return;
        if (message.content.startsWith('!ping')) 
        {
            const sentAt = message.createdAt.getTime();
            const receveidAt = new Date().getTime();
            message.channel.send("Ping : " + String(receveidAt - sentAt) + 'ms');
        }
    }
}