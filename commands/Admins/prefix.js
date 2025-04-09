const { Message, Client } = require("discord.js");
const serverModel = require("../../models/server");

module.exports = {
    name: "prefix",
    aliases: [],
    description: "Changes the bot's command prefix",
    options: ["new prefix"],
    async execute(/**@type {Message}*/message, /**@type {String[]}*/args, /**@type {Client}*/client) {
        if (message.author.id != client.creatorID) return;
        if (!client.dbUp) return message.channel.send("Sorry, unable to modify the server's prefix :(\nThe database might be down at the moment");

        let serverData;
        try {
            serverData = await serverModel.findOne({ id: message.guild.id });

            if (!serverData) {
                const server = await serverModel.create({ id: message.guild.id });
                server.save();
            }

            await serverModel.findOneAndUpdate({ id: message.guild.id }, { prefix: args[0] });
        } catch(err) { console.log(err); }

        message.channel.send(`Bot's command prefix set to \`${args[0]}\``);
    }
}