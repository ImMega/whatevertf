const logColor = require("../../utils/logColor");
const { Client } = require("discord.js");

module.exports = (/**@type {Client} */client) => {
    console.log(logColor.FgGreen + `${client.user.username} is now online!` + logColor.Reset);
}