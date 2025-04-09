require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const logColor = require("./utils/logColor");
const fs = require("fs");
const mongoose = require("mongoose");

const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences
    ]
});

client.prefix = "nig!";
client.creatorID = "470277450551656459";
client.dbUp = false;

fs.readdirSync("./handlers/").filter(file => file.endsWith(".js"))
.forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN)
.catch(err => {
    console.log(logColor.FgRed + "An error has occured while booting up the bot.\n\n" + logColor.Reset);
    console.log(err);
});
mongoose.connect(process.env.MONGO)
.then(() => {
    client.dbUp = true;
    console.log(logColor.FgGreen + "Connected to database!" + logColor.Reset);
    require("./utils/caching").default();
})
.catch(err => {
    console.log(logColor.FgRed + "An error has occured while trying to connect to the database.\n\n" + logColor.Reset);
    console.log(err);
});