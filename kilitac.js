module.exports = {
    name: "lock",
    description: "Bulunulan kanalı kilitler",
    alias: ["kilitle"],

    run: async (client, message) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.reply("Bu komutu kullanamazsın.");
        }

        await message.channel.permissionOverwrites.edit(
            message.guild.roles.everyone,
            {
                SEND_MESSAGES: false
            }
        );

        message.channel.send("🔒 Kanal kilitlendi.");
    }
};