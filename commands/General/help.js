const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    aliases: [],
    description: "Displays a help message",
    options: ["command"],
    execute(/**@type {Message}*/message, /**@type {String[]}*/args, /**@type {Client}*/client) {
        if (!args[0]) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(message.guild.members.me.displayHexColor)
                    .setThumbnail(client.user.avatarURL())
                    .setTitle(`${client.user.username} Command List`)
                    .setDescription(`**Command prefix: **\`${client.prefix}\`\n\n`
                        + `This is a list containing all the current commands.\n`
                        + `For more info about a specific command type\n\`${client.prefix}help [command]\``)
                    .addFields(client.cmdcat.map(cat => {
                        return { name: cat.name, value: cat.cmds.map(cmd => {
                            return `\`${cmd}\``;
                        }).join(" — ") };
                    }))
                ]
            });
        } else {
            const cmd = client.commands.get(args[0]) || client.commands.get(client.cmdaliases.get(args[0]));

            if (!cmd) return message.channel.send("Sorry, I don't have that command :(");

            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(message.guild.members.me.displayHexColor)
                    .setThumbnail(client.user.avatarURL())
                    .setTitle(client.prefix + cmd.name)
                    .setDescription(cmd.description
                        + `${cmd.aliases.length ? `\n\n**Aliases:** \`${cmd.aliases.join(", ")}\`` : ""}`
                        + `\n\n**Usage:** \`${client.prefix + cmd.name + `${cmd.options.length ? ` ${cmd.options.map(option => { return `[${option}]`; }).join(" ")}` : ""}`}\``)
                ]
            });
        }
    }
}