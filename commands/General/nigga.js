const { Message } = require("discord.js");

module.exports = {
    name: "nigga",
    aliases: ["crnjo", "black"],
    description: "I hate niggers",
    options: [],
    async execute(/**@type {Message} */ message) {
        await message.channel.send("jebem ti mater mrtvu");
        await message.reply("umri kurvo glupa");
        await message.channel.send("respectfully");
    }
}