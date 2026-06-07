const { MessageEmbed } = require("discord.js");

let giveaways = new Map();
module.exports = {
    name: "cekilis",
    description: "Çekiliş başlatır",
    alias: [],

    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) 
            return message.reply("Yetkin yok.");

        const duration = args[0];
        const winnerCount = parseInt(args[1]);
        const prize = args.slice(2).join(" ");

        if (!duration || !winnerCount || !prize) {
            return message.reply("Kullanım: .cekilis <süre> <kazanan sayısı> <ödül>");
        }

        const timeMs =
            duration.endsWith("s") ? parseInt(duration) * 1000 :
            duration.endsWith("m") ? parseInt(duration) * 60 * 1000 :
            duration.endsWith("h") ? parseInt(duration) * 60 * 60 * 1000 :
            null;

        if (!timeMs) return message.reply("Süre s/m/h olmalı.");

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("🎉 ÇEKİLİŞ BAŞLADI!")
            .setDescription(`🎁 Ödül: **${prize}**\n👑 Kazanan Sayısı: **${winnerCount}**\n⏰ Süre: **${duration}**\n\n🎯 Katılmak için emojiye tıklayabilirsin.`)
            .setFooter({ text: "Çekiliş başladı!" });

        const msg = await message.channel.send({ embeds: [embed] });

        await msg.react("🎉");

        giveaways.set(msg.id, {
            channelId: message.channel.id,
            prize,
            winnerCount,
            time: Date.now() + timeMs,
            messageId: msg.id
        });
        setTimeout(() => endGiveaway(client, msg.id), timeMs);
    }
};

async function endGiveaway(client, messageId) {
    const data = giveaways.get(messageId);
    if (!data) return;

    const channel = await client.channels.fetch(data.channelId);
    const msg = await channel.messages.fetch(data.messageId);

    const reactions = msg.reactions.cache.get("🎉"); 
    if (!reactions) return;

    const users = await reactions.users.fetch();
    const validUsers = users.filter(u => !u.bot).map(u => u.id);

    if (validUsers.length === 0) {
        return channel.send("❌ Katılım olmadığı için çekiliş iptal edildi."); // başka emoji bulamadım amk!
    }

    let winners = [];
    for (let i = 0; i < data.winnerCount; i++) {
        if (validUsers.length === 0) break;
        const index = Math.floor(Math.random() * validUsers.length);
        winners.push(`<@${validUsers[index]}>`);
        validUsers.splice(index, 1);
    }

    const resultEmbed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("ÇEKİLİŞ BİTTİ!")
        .setDescription(
            `🎁 Ödül: **${data.prize}**\n` +
            `🏆 Kazananlar: ${winners.join(", ")}`
        );

    channel.send({ embeds: [resultEmbed] });

    giveaways.delete(messageId);
}