const { Message } = require("discord.js");

module.exports = {
    name: "hehe",
    aliases: ["aaaa", "bbbb"],
    description: "I hate niggers",
    options: [],
    async execute(/**@type {Message} */ message) {
        await message.channel.send("jebem ti mater mrtvu");
        await message.reply("umri kurvo glupa");
        await message.channel.send("respectfully");
        await message.channel.send("respectfully");
        await message.channel.send("respectfully");
    }
}