const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const TOKEN = "NjI3OTE3NTQ2NDE0MTQ1NTY5.XZDoBQ.Zh0rbrtAAmsvMpjOII72cBhMPjg";
const prefix = "a/";

const bot = new Discord.Client();



//ready

bot.on("ready", () =>
{
    console.log("Connected");
});





//MESSAGE
bot.on("message", async mess =>
{
    if(mess.author.bot) return undefined;

    if(!mess.content.startsWith(prefix)) return undefined;

    var args = mess.content.split(' ');

    if(mess.content.startsWith(`${prefix}ver`))
    {
        mess.channel.send("Aktualnie wersja 1.0");
    }

    if(mess.content.startsWith(`${prefix}play`))
    {
        const voiceChannel = mess.member.voiceChannel;
        const perm = voiceChannel.permissionsFor(mess.client.user);

        if(!perm.has("CONNECT")) return mess.channel.send("Nie mogę dołączyć. Daj uprawienia");

        if(!perm.has("SPEAK")) return mess.channel.send("Nie mogę się odzywać. Daj uprawnienie");

        try
        {
            var connection = await voiceChannel.join();
        }
        catch(error)
        {
            console.log(error);
            mess.channel.send(error);
            return mess.channel.send("Nie moge wbic na kanał, coś nie działa");
        }

        const dispatcher = connection.playStream(ytdl(args[1]))
        .on("end", () =>
        {
            mess.channel.send("Koniec piosenki");
            voiceChannel.leave();
        })
            .on("error", error =>
            {
                mess.channel.send(error);
                return console.log(error);
            });

        }
            else if(mess.content.startsWith(`${prefix}stop`))
            {
                if(!mess.member.voiceChannel) return mess.channel.send("Nie jesteś na kanale");
                mess.member.voiceChannel.leave();
                return undefined;
            }

});


bot.login(TOKEN);