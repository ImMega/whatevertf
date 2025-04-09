const fs = require("fs");
const logColor = require("../utils/logColor");
const { Client } = require("discord.js");

module.exports = (/** @type {Client} */client, /**@type {Boolean}*/reload) => {
    const initStamp = Date.now();
    const dirs = fs.readdirSync("./events/");

    for (const dir of dirs) {
        const files = fs.readdirSync(`./events/${dir}/`);

        for (const file of files) {
            const name = file.split(".")[0];
            const eventFunc = require(`../events/${dir}/${file}`);

            client.on(name, eventFunc.bind(null, client));

            if (!reload) console.log(logColor.FgYellow + file + logColor.Reset + ` event file loaded`);
        }

        if (files.length && !reload) console.log("Event " + logColor.FgBlue + dir + logColor.Reset + " files loaded successfully!");
    }

    const doneStamp = Date.now();
    const timeTaken = doneStamp - initStamp;

    if (!reload) console.log(logColor.FgGreen + `Event files loaded in ${(timeTaken/1000).toFixed(1)}s (${timeTaken}ms).` + logColor.Reset);
}