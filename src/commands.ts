import Cheerio from 'cheerio';
import Discord from 'discord.js'

export const Commands : {} = {
    "!ping" : function (message: Discord.Message): void {
            const sentAt = message.createdAt.getTime();
            const receveidAt = new Date().getTime();
            message.channel.send("Ping : " + String(receveidAt - sentAt) + 'ms');
    },
    /*
    "!planning" : function (message: Discord.Message): void {
        scrapData("https://rapla.imerir.com/rapla?page=calendar&user=admin&file=L3G1&today", message);
    }
    */
}

interface Lesson {
    [key: string]: any;
}


function scrapData(url: string, /*messageReference: Discord.Message*/): void{
    const request = require('request');
    request(url, function (error : any, response : any, body : string) {
        if (!error && response.statusCode == 200) {
            // Parse body as DOM
            const $ = Cheerio.load(body);
            // Gather "infotable" class inside "tooltip" class inside "week_block" class
            const lessons = $('.week_block').find('.tooltip').find('.infotable');
            let lessonArray = [];
            for(let i = 0; i < lessons.length; i++) {
                let tmpLesson : Lesson = {
                    "day": undefined,
                    "from": undefined,
                    "to": undefined,
                    "subject": undefined,
                    "teacher": undefined,
                    "room": undefined
                };
                const lesson = $(lessons[i]);
                const lessonDate: string = lesson.closest('.tooltip').find('div').eq(1).text();
                // What are the first three characters of the date?
                tmpLesson.day = lessonDate.substring(0, 3);
                // Parse the date until you find "PM"
                const lessonFrom = lessonDate.substring(4, lessonDate.indexOf("-") - 1);
                // Do a regular expression to match start from "-" and end at "PM" or "AM":
                const lessonFromRegex = /-([0-9]{1,2}:[0-9]{2} PM)|-([0-9]{1,2}:[0-9]{2} AM)/;
                // Get the match:
                const lessonFromMatch = lessonFromRegex.exec(lessonDate);
                // Log the match:
                console.log("Regex : " + (lessonFromMatch as any)[2]);


                const lessonTo = lessonDate.substring(lessonDate.indexOf("-") + 2, lessonDate.length - 1);
                //tmpLesson.time = lessonTime;
                for(let j = 0; j < lesson.find('td').length; j++) {
                    const lessonHint : string = lesson.find('td').eq(j).text();
                    if(lessonHint === "eventname:")
                    {
                        tmpLesson.subject = lesson.find('td').eq(j+1).text();
                    }
                    else if(lessonHint === "Resources:")
                    {
                        tmpLesson.room = lesson.find('td').eq(j+1).text();
                    }
                    else if(lessonHint === "Persons:")
                    {
                        tmpLesson.teacher = lesson.find('td').eq(j+1).text();
                    }
                }
                lessonArray.push(tmpLesson);
            }
            
            //messageReference.channel.send(JSON.stringify(lessonArray));
        }
    });
}

scrapData("https://rapla.imerir.com/rapla?page=calendar&user=admin&file=L3G1&today")