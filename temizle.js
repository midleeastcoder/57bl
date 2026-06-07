module.exports = {
    name: "sil",
    description: "Mesaj temizler",
    alias: ["temizle", "clear"],
    owneronly: 0,

    run: async (client, message) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Bu komutu kullanmak için Mesajları Yönet yetkisine sahip olmalısın!");
        }

        const args = message.content.trim().split(/ +/).slice(1);

        if (!args[0]) {
            return message.reply("Kullanım: `.sil 10`");
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply("1 ile 100 arasında bir sayı gir!");
        }

        try {
            await message.channel.bulkDelete(amount, true);

            const msg = await message.channel.send(`✅ ${amount} mesaj silindi.`);
            setTimeout(() => {
                msg.delete().catch(() => {});
            }, 3000);

        } catch (err) {
            console.error(err);
            message.reply("Mesajlar silinirken hata oluştu.");
        }
    }
};