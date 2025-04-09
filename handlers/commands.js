const { Client, Collection } = require("discord.js");
const fs = require("fs");
const logColor = require("../utils/logColor");

const hiddenFolders = ["private"];

module.exports = (/**@type {Client}*/ client, /**@type {Boolean}*/reload) => {
    client.commands = new Collection();
    client.cmdaliases = new Collection();
    client.cmdcat = [];

    const cats = fs.readdirSync("./commands/");

    const initStamp = Date.now();

    for (const cat of cats) {
        if (!fs.statSync(`./commands/${cat}`).isDirectory()) continue;
        const files = fs.readdirSync(`./commands/${cat}/`);

        if (!files) continue;

        if (!hiddenFolders.find(i => i == cat)) client.cmdcat.push({ name: cat, cmds: [] });
        
        var catCmdCount = 0;

        for (const file of files) {
            if (!file.endsWith(".js")) continue;
            const cmd = require(`../commands/${cat}/${file}`);

            client.commands.set(cmd.name, cmd);
            cmd.aliases.forEach(alias => { client.cmdaliases.set(alias, cmd.name) });

            if (!hiddenFolders.find(i => i == cat)) client.cmdcat.find((i) => i.name == cat).cmds.push(cmd.name);

            catCmdCount++;
            if (!reload) console.log(logColor.FgYellow + file + logColor.Reset + ` command file loaded`);
        }

        if (files.length && !reload) console.log("Command category " + logColor.FgBlue + cat + logColor.Reset + " loaded " + logColor.FgYellow + `(${catCmdCount} commands)` + logColor.Reset);
    }

    const doneStamp = Date.now();
    const timeTaken = doneStamp - initStamp;

    if (!reload) console.log(logColor.FgGreen + `Command files loaded in ${(timeTaken/1000).toFixed(1)}s (${timeTaken}ms)` + logColor.Reset);
}