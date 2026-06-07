module.exports = {
    name: "lock",
    description: "Kanalı kilitler/açar",
    alias: ["kilitle"],

    run: async (client, message) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.reply("Bu komutu kullanamazsın.");
        }

        try {
            const everyone = message.guild.roles.everyone;

            const perms = message.channel.permissionOverwrites.cache.get(everyone.id);

            const locked = perms?.deny?.has("SEND_MESSAGES");

            if (locked) {
                await message.channel.permissionOverwrites.edit(everyone, {
                    SEND_MESSAGES: null
                });

                return message.channel.send("🔓 Kanalın kilidi açıldı.");
            }

            await message.channel.permissionOverwrites.edit(everyone, {
                SEND_MESSAGES: false
            });

            message.channel.send("🔒 Kanal kilitlendi.");

        } catch (err) {
            console.error(err);
            message.reply("Bir hata oluştu.");
        }
    }
};