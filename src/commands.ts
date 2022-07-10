import Discord from 'discord.js'

export const Commands : {} = {
    "!ping" : function (message: Discord.Message): void {
            const sentAt = message.createdAt.getTime();
            const receveidAt = new Date().getTime();
            message.channel.send("Ping : " + String(receveidAt - sentAt) + 'ms');
    }
}

function scrapData(url: string): void {
    const request = require('request');
    request(url, function (error : any, response : any, body : string) {
        if (!error && response.statusCode == 200) {
            // Parse body as DOM
            const cheerio = require('cheerio');
            const $ = cheerio.load(body);
            // Gather second <div> inside "tooltip" class inside "week_block" class
            const dates = $('.week_block').find('.tooltip').find('div').eq(1); // Still something to do there
            // Gather "infotable" class inside "tooltip" class inside "week_block" class
            const lessons = $('.week_block').find('.tooltip').find('.infotable');
            // For each lesson, gather its <td></td>:
            for(let i = 0; i < lessons.length; i++) {
                const lesson = $(lessons[i]);
                for(let j = 0; j < lesson.find('td').length; j++) {
                    const lessonHint = lesson.find('td').eq(j).text();
                    if(lessonHint === "eventname:")
                    {
                        console.log(lesson.find('td').eq(j+1).text());
                    }
                    else if(lessonHint === "Resources:")
                    {
                        console.log(lesson.find('td').eq(j+1).text());
                    }
                }
            }
        }
    });
}

scrapData("https://rapla.imerir.com/rapla?page=calendar&user=admin&file=L3G1&today")