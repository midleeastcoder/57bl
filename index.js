const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

client.once("ready", () => {
    console.log(`✔ Bot hazır: ${client.user.tag}`);
});

// SLASH KOMUT YANITI (EN ÖNEMLİ KISIM)
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "cekilis") {
        await interaction.reply("🎉 Çekiliş sistemi aktif!");
    }
});

client.login(token);