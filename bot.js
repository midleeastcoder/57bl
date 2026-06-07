const { Client, Collection, Intents } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { readdirSync } = require("fs");
const { prefix, token, owner } = require("./config.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection();
client.aliases = new Collection();

for (const file of readdirSync("./commands").filter(f => f.endsWith(".js"))) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

    if (command.alias && Array.isArray(command.alias)) {
        command.alias.forEach(alias => {
            client.aliases.set(alias, command.name);
        });
    }

    console.log(`[COMMAND] ${command.name} yüklendi.`);
}

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    if (command.owneronly === 1 && message.author.id !== owner) return;

    try {
        await command.run(client, message, args);
    } catch (err) {
        console.error(`[HATA] ${command.name}`, err);
        message.reply("Error");
    }
});

client.once("ready", () => {
    client.user.setActivity("France #TAG", { type: "PLAYING" });
    const channel = client.channels.cache.get("1512816550371917940");
    if (!channel) return console.log("Ses kanalı bulunamadı!");

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });

    console.log(`${client.user.tag} sese bağlandı ve aktif!`);
});

process.on("unhandledRejection", err => {
    console.error("CRASH:", err);
});

process.on("uncaughtException", err => {
    console.error("CRASH:", err);
});

client.login(token);