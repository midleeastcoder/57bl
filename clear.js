const { Permissions } = require("discord.js");

module.exports = {
    name: "messageCreate",

    async execute(message) {

        if (message.author.bot) return;

        if (message.content === ".temizle") {

            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                return message.reply("❌ Bu komutu kullanmak için **Mesajları Yönet** yetkin olmalı.");
            }

            const channel = message.channel;

            await message.reply("🧹 Kanal temizleniyor...");

            try {
                let messages;

                while (true) {
                    messages = await channel.messages.fetch({ limit: 100 });
                    if (messages.size === 0) break;

                    const deletable = messages.filter(
                        msg => (Date.now() - msg.createdTimestamp) < 1209600000
                    );

                    if (deletable.size === 0) break;

                    await channel.bulkDelete(deletable, true);
                }

                channel.send("✅ Tüm mesajlar temizlendi!");

            } catch (err) {
                console.log(err);
                channel.send("❌ Temizleme sırasında hata oluştu.");
            }
        }
    }
};