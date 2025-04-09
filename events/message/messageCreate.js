const { Client, Message } = require("discord.js");
const serverModel = require("../../models/server");

module.exports = async (/**@type {Client}*/client, /**@type {Message}*/message) => {
    let serverData;
    serverData = (client.dbUp) ? (await serverModel.findOne({ id: message.guild.id })) : require("../../utils/caching").cache.find(s => s.id == message.guild.id);
    const prefix = serverData ? serverData.prefix : client.prefix;
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.cmdaliases.get(command));

    if (cmd) cmd.execute(message, args, client);
    
    if (!client.dbUp) return;
    try {
        if (!serverData) {
            const server = await serverModel.create({ id: message.guild.id });
            server.save();
        }
    } catch(err) { console.log(err); }
}